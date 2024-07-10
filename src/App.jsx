import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Details from './components/Details'
import { Link } from 'react-router-dom'

const App = () => {
  const { search, pathname } = useLocation();
  console.log(search, pathname);

  return (
    <div className='h-screen w-screen flex'>
      {pathname !== '/' || search.length > 0 && (
              <Link to="/" className='text-red-300 absolute left-[17%] top-[3%] '>
                HOME
              </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  )
}

export default App