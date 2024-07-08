import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './assets/components/Home'
import Details from './assets/components/Details'

const App = () => {
  return (
    <div className='h-screen w-screen flex'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  )
}

export default App