import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] =useState('');
    const [file,setFile] = useState('')
    const [password,setPassword] = useState('');
    const [imagePreview,setImagePreview] = useState('');
    const nav = useNavigate();

    useEffect(()=>{
      if(file){
        //convert project image to url
        setImagePreview(URL.createObjectURL(file))
      }
      
  },[file])

    const Register = async () => {


      if(!name||!password||!email){
        alert('please fill every fields');
        return;
      }

      else if(!file){
        alert('uplaod a profile picture');
        return;
      }


      const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('file', file);
            formData.append('password',password)
    
    
      try {
        const response = await axios.post('http://localhost:4000/user/register', formData);
        console.log('Registration successful:', response.data);
        nav('/login')

       
      } catch (error) {
        alert(error?.response?.data?.message) 
      }
    };
    

  return (
    <div className='h-screen flex justify-center items-center' style={{backgroundImage:"url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapertip.com%2Fwmimgs%2F83-838362_web-developer.jpg&f=1&nofb=1&ipt=844a12c45825b98a6a15aef9c342bb1f23591c91a357a462583c91a64412656e&ipo=images')"}}>
    <div className='flex flex-col justify-center items-center shadow-xl gap-3 py-5 px-5 rounded-lg bg-gray-200'>
      <div className='flex justify-center items-center px-5 pt-5 border-b-4'> 
          <div>
          <h1 className='text-4xl font-bold text-gray-800'>Movie Blogger</h1>
          <p>Please sign up to create your post</p>
          </div>
      </div>
      <div className='flex flex-col gap-2 justify-center items-center'>
      <label>
           <input type="file" multiple="none" onChange={(e)=>setFile(e.target.files[0])} className='d-none' />
           <img  width={'90px'} 
            src={imagePreview ? imagePreview :"https://cdn-icons-png.flaticon.com/128/149/149071.png"} alt="user Upload" />
      </label>
     <TextField id="outlined-basic" onChange={e=>setName(e.target.value)} label="username" variant="outlined" />
        <TextField id="outlined-basic" onChange={e=>setEmail(e.target.value)} label="email" variant="outlined" />
        <TextField id="outlined-basic" onChange={e=>setPassword(e.target.value)} label="password" type='password' variant="outlined" />
        <Button variant="outlined" onClick={Register}>Register</Button> 
      </div>
      </div>
    </div>
  )
}

export default Register