const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'blogapp';
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);

// Register endpoint
router.post('/register',uploadMiddleware.single('file') ,async (req, res) => {
    let newPath = null;
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
     newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    try {
        const { name, email, password } = req.body;

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingName = await User.findOne({ name });

        if (existingName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Use async/await to wait for the user creation
        const dbDetails = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt),
            picture:newPath
        });

        return res.status(200).json(dbDetails);
    }   catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    
    try {
        const userDoc = await User.findOne({ name });

        if (!userDoc) {
            return res.status(401).json({ message: "Invalid username" });
        }

        const passOK = bcrypt.compareSync(password, userDoc.password);

        if (passOK) {
            
           
            const token = jwt.sign({ name, id: userDoc._id,picture:userDoc.picture}, secret, {});
            
            
            res.cookie('token', token).json({ 
                id:userDoc._id,
                name,
                picture:userDoc.picture
             });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if (err) throw err;
        res.json(info);
        console.log(info)
    })
})

router.post('/logout',(req,res)=>{
    res.cookie('token', '', { expires: new Date(0) }).json('ok');
})

module.exports = router;
