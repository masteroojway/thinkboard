import React, { useEffect, useState } from 'react'
import Navigate from '../components/navigate'
import Ratelimit from '../components/ratelimit';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
const Home = () => {
  const [isRatelimited, setratelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  useEffect(() => {
    fetchnotes();
  }, []);
  async function deletenote(id){
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/app/routes/${id}`);
      fetchnotes();
      toast.success("Note Deleted successfully")
    } catch (error) {
      console.log(error);
      toast.error("Could not Delete note");
    } finally{
      setLoading(false);
    }
  }
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
              <div className='bg-green-600 text-black p-2 m-3 rounded-2xl hover:bg-green-500 cursor-pointer'>
                <div className='bg-amber-50/40 m-2 p-2 rounded-xl text-xl font-bold'>
                  {note.title}
                </div>
                <div className='m-2 p-2 text-lg'>
                  {note.content}
                </div>
                <div className='text-sm font-bold text-gray-800 flex justify-between m-3'>
                  {new Date(note.createdAt).toLocaleDateString()}
                  <div className='flex'>
                    <PenSquareIcon className='m-1 hover:bg-amber-50/40 size-7 p-1 rounded-xl'/>
                    <Trash2Icon className='m-1 hover:bg-amber-50/40 size-7 p-1 font-bold rounded-xl' onClick={()=> {
                      deletenote(note._id);
                    }}/>
                  </div>
                </div>
              </div>
            ))
          }
        </div>)}
    </div>
  )
}

export default Home