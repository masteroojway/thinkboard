import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/home'
import Create from './pages/create'
import Board from './pages/board'
import toast from 'react-hot-toast'
const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create />} />
        <Route path='/board/:id' element={<Board/>}/>
      </Routes>
    </div>
  )
}

export default App