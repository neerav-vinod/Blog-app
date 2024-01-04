import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Create = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null); 
    const [redirect,setRedirect] = useState(false);

    const nav = useNavigate();
 
  
    const createPost = async () => {
        if (title === '' || summary === '' || content === '' || file === null) {
            alert('Please Fill every Fields');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('summary', summary);
            formData.append('file', file);
            formData.append('content', content);
    
            const response = await fetch('http://localhost:4000/post/create', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
    
            if (response.ok) {
                alert('Post created successfully!');
                setRedirect(true);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    
    // Redirect after the fetch request is complete
    if (redirect) {
        nav('/');
    
    };

    return (
        <div>
            <Header/>
            <div className='p-10'>
                <input
                    type='text'
                    name=''
                    id=''
                    className='border text-black w-[100%] h-[5vh] p-3'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='title'
                />
                <input
                    type='text'
                    className='border  w-[100%] h-[5vh] mt-2 p-3'
                    placeholder='summary'
                    onChange={(e) => setSummary(e.target.value)}
                />
                <input type='file' className='my-2' onChange={(e) => setFile(e.target.files[0])} />
                <ReactQuill value={content} onChange={(value) => setContent(value)} />
                <button className='w-[100%] mt-2 bg-slate-400 p-3 rounded-xl' onClick={createPost}>
                    Create Post
                </button>
            </div>
        </div>
    );
};

export default Create;
