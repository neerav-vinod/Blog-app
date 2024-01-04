import React from 'react'
import {formatISO9075} from 'date-fns'
import { useNavigate } from 'react-router-dom'



const Articles = ({post}) => {
    const nav = useNavigate();
    console.log(post)
  return (
    <div onClick={() => nav(`/post/${post._id}`)} className='bg-white p-4 rounded-lg cursor-pointer'>
    <img src={`http://localhost:4000/${post.cover}`} alt="" className='h-40 w-full object-cover object-center rounded-lg mb-4' />
    <h1 className='text-xl font-bold mb-2 text-black'>{post.title}</h1>
    <p className='text-gray-600'>{post.summary}</p>
    <div className='flex mt-4'>
      <img src={`http://localhost:4000/${post.author.picture}`} alt="" className='h-6 w-6 rounded-full object-cover object-center' />
      <p className='ml-2 text-sm text-gray-700'>{post.author.name}</p>
      <span className='ml-2 text-sm font-medium text-gray-500'>{formatISO9075(new Date(post.createdAt))}</span>
    </div>
  </div>
  )
}

export default Articles