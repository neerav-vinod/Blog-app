
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import axios from 'axios';

const PostPage = () => {
    const nav = useNavigate()
    const [postInfo, setPostInfo] = useState({});
    const {userInfo} = useContext(UserContext)
    const [author,setAuthor] = useState('')
    const [authorId,setAuthorId] = useState('')
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/fetchposts/${params.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch post with ID ${params.id}`);
                }
                return response.json();
            })
            .then((postInfo) => {
                console.log(postInfo)
                setPostInfo(postInfo);
                setAuthor(postInfo.author.name)
                setAuthorId(postInfo.author._id)
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });
    }, []);

    console.log(postInfo); 

    const deletePost = async() =>{
        const response = await axios.delete(`http://localhost:4000/post/delete/${params.id}`);

        console.log(response);
        nav('/');
    }

    return (
        <>
        <Header/>
        <div>
            <div>
                <h1 className='text-4xl font-bold p-3'>{postInfo.title}</h1>
            </div>
            <div>
                <img src={'http://localhost:4000/'+ postInfo.cover} alt="" className='w-[100vw] h-[500px] p-3 object-cover object-center' />
            </div>
            <div>
                <div><p className='p-2 font-bold'>{author} <span className='font-medium ml-2'>{(postInfo.createdAt)}</span></p></div> 
            </div>
                {userInfo?.id === authorId ? 
                    <div className='p-2 flex gap-3'>
                        <button onClick={()=>nav(`/post/edit/${params.id}`)}><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={deletePost}><i class="fa-solid fa-trash"></i></button>
                    </div>
                : "" }
            <div className='p-2' style={{textDecoration:"none"}} dangerouslySetInnerHTML={{__html:postInfo.content}}/> 
        </div>
        
        </> 
    );
};

export default PostPage;
