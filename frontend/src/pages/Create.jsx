import React, { useState } from 'react'
import Navigate from '../components/navigate';
import Ratelimit from '../components/ratelimit';
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router';
const Create = () => {
  const [content, setContent] = useState('');
  const [heading, setHeading] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRatelimited, setratelimited] = useState(false);

  const navigate = useNavigate();
  async function handlesubmit(e){
    e.preventDefault();
    if(!heading.trim() || !content.trim())
    {
      toast.error("Could not create Note");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/app/routes", {title: heading,content: content,})
      toast.success("Note Created Succesfully")
      navigate('/');
      setratelimited(false);
    } catch (error) {
      if(error.response.status === 429) {setratelimited(true);toast.error("Too many requests");}
    } finally{
      setLoading(false);
    }
  }
  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <Navigate />
      {isRatelimited && <div className='flex justify-center m-4 p-4 bg-green-500/50 rounded-2xl'>
        <Ratelimit />
      </div>}
      {loading && (
        <div className='mx-auto text-green-500 font-bold text-2xl my-auto bg-amber-800 rounded-2xl m-4 p-4'>
          Loading ...
        </div>
      )}
      <form onSubmit={handlesubmit} className='p-6 m-4 bg-green-950 rounded-2xl min-w-[400px] w-[80%]'>
        <h2>Title</h2>
        <input type="text" disabled={loading} placeholder='Note Title' required className='outline-0 p-4 my-4 bg-white/20 rounded-full w-full hover:bg-white/40' value={heading} onChange={(e)=> setHeading(e.target.value)}/>
        <h2>Content</h2>
        <textarea disabled={loading} placeholder='Type your Note here' className='w-full outline-0 p-4 my-4 bg-white/20 rounded-3xl hover:bg-white/40' value={content} onChange={(e)=> setContent(e.target.value)} required/>
        <div className='w-full flex justify-end'>
        <button type="submit" className='btn bg-amber-900 hover:bg-gray-900' disabled={loading}>
          {loading ? "Creating Note ...":"Create Note"}
        </button>
        </div>
      </form>
      
    </div>
  )
}

export default Create