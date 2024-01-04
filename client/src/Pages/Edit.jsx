import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

const Edit = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const nav = useNavigate();

    const updatePost = () => {
        const formData = new FormData();
            formData.append('title', title);
            formData.append('summary', summary);
            formData.append('content', content); 
            formData.append('id',id)
            if(file?.[0]){
                formData.append('file', file?.[0]);
            }
            fetch('http://localhost:4000/post/update',{
            method: 'PUT',
            body:formData,
            credentials:'include'       
        })

        nav('/')

    }

    useEffect(()=>{
        fetch('http://localhost:4000/post/fetchposts/'+id)
        .then(response =>{
            response.json().then(postInfo =>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
                
            })
        })
    },[])
  return (
    <div>
            <Header/>
            <div className='p-10'>
                <input
                    type='text'
                    name=''
                    id=''
                    value={title}
                    className='border text-black w-[100%] h-[5vh] p-3'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='title'
                />
                <input
                    type='text'
                    className='border  w-[100%] h-[5vh] mt-2 p-3'
                    placeholder='summary'
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                {/* <input type='file' className='my-2' onChange={(e) => setFile(e.target.files)} value={file}/> */}
                <ReactQuill value={content} onChange={(value) => setContent(value)} />
                <button className='w-[100%] mt-2 bg-slate-400 p-3 rounded-xl' onClick={updatePost} >
                    Edit Post
                </button>
            </div>
        </div>
  )
}

export default Edit