const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const jwt = require('jsonwebtoken'); 
const PostModel = require('../models/postModel');

router.post('/create', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    try{
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    const secret = 'blogapp';
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.status(200).json(postDoc);
    });
    }catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/fetchposts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author').sort({createdAt:-1});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/fetchposts/:id', async(req,res)=>{
   const {id} = req.params
   const PostDoc = await Post.findById(id).populate('author',['name']);
   res.status(200).json(PostDoc);
})

router.put('/update', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    
    try {
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }

        const { token } = req.cookies;
        const secret = 'blogapp';
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { title, summary, content, id } = req.body;
            const postDoc = await Post.findById(id);

            if (!postDoc) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

            if (!isAuthor) {
                return res.status(400).json("You are not the author of this post");
            }

            await postDoc.updateOne({
                title: title,
                summary: summary,
                content: content,
                cover: newPath ? newPath : postDoc.cover,
            });

            res.json(postDoc);
        });
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/profilefetch/:id',async(req,res)=>{
    try{
    const userId = req.params.id

    const posts = await PostModel.find({'author': userId }).populate('author').sort({createdAt:-1})
    res.json(posts)
    console.log(posts)
}
catch(error){
    res.status(500).json({message:"hi error ond ketto mowne"})
}


})

router.delete('/delete/:id', async(req,res)=>{
    try {
        const { id } = req.params;
        
            const postDoc = await Post.findById(id);

            if (!postDoc) {
                return res.status(404).json({ message: 'Post not found' });
            }

            await PostModel.findByIdAndDelete(id);

            

        res.json({message:"Post Deleted Sucessfully"})
        }catch (err) {
            console.error('Error during delete:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
        
})



module.exports = router;
