import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Articles from '../components/Articles';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

const ProfilePage = () => {
    const nav = useNavigate();
    const params = useParams();
    const[posts,setPosts] = useState([]);
    const {userInfo} = useContext(UserContext)
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:4000/post/profilefetch/${params.id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch posts');
            }
    
            const fetchedPosts = await response.json();
             setPosts(fetchedPosts);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
        
       const data =localStorage.getItem('details');
       if(data){
        fetchData();
       }
       else{
        nav('/');
       }
      }, []); 

      console.log("_____fetchedData___",posts)

      
    
  return (
    <div>
      <Header/>
        <div className='flex gap-5 p-5 mt-2 justify-center'>
       <div className='flex justify-center items-center'>
            <img src={'http://localhost:4000/'+ userInfo?.picture} alt="" className='h-[200px] rounded-full w-[200px] object-cover object-center'/>
       </div> 
       <div className='flex flex-col justify-center items-center'>
        <h1 className='text-5xl'>{userInfo?.name}</h1>
        <p className='mt-3'>Total Blogs:{posts.length}</p>
       </div>
       </div>

       <div>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {posts.length > 0 &&
        posts.map((post) => (
          <Articles key={post._id} post={post} />
        ))}
    </div>
       </div>
    </div>
  )
}

export default ProfilePage