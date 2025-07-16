import React from 'react'
import {PlusIcon} from 'lucide-react'
import { useNavigate } from 'react-router'
const Navigate = () => {
    const nav = useNavigate();
  return (
    <div className='flex bg-black/30 border-base-content/10'>
        <div className='p-4 my-4 mx-auto text-2xl bg-green-400 text-black font-bold rounded-xl font-mono'>ThinkBoard</div>
        <div className='btn mx-auto my-auto bg-amber-900 hover:bg-gray-900' onClick={()=> nav("/create")}>
            <PlusIcon />
            Create
        </div>
    </div>
  )
}

export default Navigate