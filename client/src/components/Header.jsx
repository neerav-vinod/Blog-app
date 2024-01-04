import React, { useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {FaBars,FaTimes,} from 'react-icons/fa'
import { HiSun} from 'react-icons/hi';

const Header = () => {

    const navigation = useNavigate()
    const {setUserInfo,userInfo} = useContext(UserContext)
    useEffect(()=>{
      fetch('http://localhost:4000/user/profile',{
        credentials:'include'
      }).then(response =>{
        response.json().then(userInfo=>{
            setUserInfo(userInfo)
            localStorage.setItem('details',JSON.stringify(userInfo))  
        })
      }) 
    },[setUserInfo])
    console.log("Header UserInfo",userInfo)

    function Logout(){
     fetch('http//localhost:4000/user/logout',{method:'POST'},{
        credentials:'include',
     }) 
     setUserInfo(null)
     function clearCookie(cookieName) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } 
    clearCookie('token');
    localStorage.clear();
     navigation('/')
    }

    const [nav,setNav] = useState(false);
    
    const handleClick = () => setNav(!nav)

  return (
 <>
      <div className='  w-full h-[80px] flex justify-between items-center p-4 bg-[white] text-gray-900 cursor-pointer'>
        <div onClick={()=>navigation('/')}>
            <p className=' text-2xl font-medium text-blue-700 flex items-center'>Movie 
            <span className='ml-2 text-gray-900'>Blogger</span>
            </p>
        </div>

        {/* Menu */}
            {userInfo ? <ul className='hidden md:flex font-light justify-center items-center gap-2'>
            <li onClick={()=>navigation('/create')}>Create Post</li>
            <li onClick={Logout}>Logout</li> 
          <li onClick={()=>navigation('/user/profile/'+ userInfo.id)}> <img src={`http://localhost:4000/${userInfo.picture}`} alt="" className='h-8 rounded-full w-8 object-cover'/> </li> 
           {/* <li ><HiSun /></li> */}
            </ul>:<ul className='hidden md:flex font-light justify-center items-center gap-2'>
            <li onClick={()=>navigation('/login')}>Login</li>
            <li onClick={()=>navigation('/register')}>Register</li> 
              </ul>}
       

        {/* Hamburger */}
        <div onClick={handleClick} className='md:hidden z-10 flex gap-2 items-center'>
            {!nav ? <FaBars/> : <FaTimes/>}

        </div>
        {/* Mobile Menu */}
        {userInfo?<ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#0a192f]  dark:bg-gray-200 flex flex-col justify-center items-center'}>
            <li className='text-4xl py-6 m-2' onClick={()=>{navigation('/create') }}>Create Post</li>
            <li className='text-4xl py-6 m-2' onClick={Logout}>Logout</li> 
            <li className='text-4xl py-6 m-2' onClick={()=>navigation('/user/profile/'+ userInfo.id)}>Profile</li> 
        </ul>:<ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#0a192f]  dark:bg-gray-200 flex flex-col justify-center items-center'}>
            <li className='text-4xl py-6 m-2' onClick={()=>navigation('/login')}>Login</li>
            <li className='text-4xl py-6 m-2' onClick={()=>navigation('/register')}>Register</li>
          </ul>}
        </div>
 </>
  )
}

export default Header