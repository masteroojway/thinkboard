import React, { useEffect, useState } from 'react'
import Navigate from '../components/navigate'
import Ratelimit from '../components/ratelimit';
import axios from 'axios'

const Home = () => {
  const [isRatelimited, setratelimited] = useState(true);
  useEffect(() => {
    async function fetchnotes(){
      try {
        const res = await axios.get("http://localhost:3000/app/routes");
        console.log(res.data);
      } catch (error) {
        console.log("error is ", error);
      }
    }
    fetchnotes();
  })
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Navigate />
      {isRatelimited && <div className='flex justify-center m-4 p-4 bg-green-500/50 rounded-2xl'>
        <Ratelimit/>
      </div>}
      
    </div>
  )
}

export default Home