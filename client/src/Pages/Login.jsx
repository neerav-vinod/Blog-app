import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import axios from 'axios';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  
  const {setUserInfo,userInfo} = useContext(UserContext)
  const nav = useNavigate()

  const handleLogin = async () => {
    if(!name||!password){
      alert('please fill every fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        name,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setUserInfo(response.data);
        nav('/');
        localStorage.setItem('details',JSON.stringify(response.data))
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  console.log(userInfo);

  return (
    <div className='h-screen flex justify-center items-center' style={{backgroundImage:"url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapertip.com%2Fwmimgs%2F83-838362_web-developer.jpg&f=1&nofb=1&ipt=844a12c45825b98a6a15aef9c342bb1f23591c91a357a462583c91a64412656e&ipo=images')"}}>
    <div className='flex flex-col justify-center items-center shadow-xl gap-3 py-5 px-5 rounded-lg bg-gray-200'>
      <div className='flex justify-center items-center p-5 border-b-4'> 
          <div>
          <h1 className='text-4xl font-bold text-gray-800'>Movie Blogger</h1>
          <p>Welcome Back</p>
          </div>
      </div>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <TextField
          id="outlined-username"
          onChange={(e) => setName(e.target.value)}
          label="Username"
          variant="outlined"
        />
        <TextField
          id="outlined-password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type='password'
          variant="outlined"
        />
        <Button onClick={handleLogin} variant="outlined">
          Login
        </Button>
      </div>
      <p className=' cursor-pointer hover:underline' onClick={()=>nav('/register')}>New User ? Create an Account</p>
      </div>
    </div>
  );
}

export default Login;