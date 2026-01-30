import React from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Bai1 from './component/bai1'
import Bai2 from './component/bai2'
import Bai3 from './component/bai3'

function App() {
  return (
    <div className="">
      <nav style={{ marginBottom: 20 }} className='navlink'>
        <Link to="/bai1">Bài 1</Link>
        <Link to="/bai2">Bài 2</Link> 
        <Link to="/bai3">Bài 3</Link>
      </nav>  
      <Routes>
        <Route path='/bai1' element={<Bai1 />} />
        <Route path='/bai2' element={<Bai2 />} />
        <Route path='/bai3' element={<Bai3 />} />
      </Routes>
    </div>
  )
}

export default App  
