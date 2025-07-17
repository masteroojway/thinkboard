import React, { useEffect, useState } from 'react'
import Navigate from '../components/navigate'
import Ratelimit from '../components/ratelimit';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router';
const Home = () => {
  const [isRatelimited, setratelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchnotes(){
      try {
        const res = await axios.get("http://localhost:3000/app/routes");
        console.log(res.data);
        setNotes(res.data);
        setratelimited(false);
      } catch (error) {
        console.log("error is ", error);
        if(error.response.status === 429){
          setratelimited(true);
        }
        else{
          toast.error("Could not get notes");
        }
      } finally{
        setLoading(false);
      }
    }
    fetchnotes();
  }, [])
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Navigate />
      {isRatelimited && <div className='flex justify-center m-4 p-4 bg-green-500/50 rounded-2xl'>
        <Ratelimit/>
      </div>}
      {loading && (
        <div className='mx-auto text-green-500 font-bold text-2xl my-auto bg-amber-800 rounded-2xl m-4 p-4'>
          Loading ...
        </div>
      )}
      {!isRatelimited && notes.length > 0&& !loading &&(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {
            notes.map(note => (
              <div className='bg-green-600 text-black p-4 m-4 rounded-2xl hover:bg-green-500 cursor-pointer' onClick={()=> navigate(`/board/${note._id}`)}>
                <div className='bg-amber-50/40 m-2 p-2 rounded-xl text-xl font-bold'>
                  {note.title}
                </div>
                <div className='m-2 p-2 text-lg'>
                  {note.content}
                </div>
                <div>
                  
                </div>
              </div>
            ))
          }
        </div>)}
    </div>
  )
}

export default Home