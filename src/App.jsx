import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Details from './components/Details'
import Edit from './components/Edit'
import { Link } from 'react-router-dom'

const App = () => {
  const { search, pathname } = useLocation();
  console.log(search, pathname);

  const showHomeLink = pathname !== '/' || search.length > 0 || pathname.startsWith('/details');

  return (
    <div className='h-screen w-screen flex'>
      {showHomeLink && (
        <Link to="/" className='text-red-300 absolute left-[17.5%] top-[2.5%] '>
          HOME
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App