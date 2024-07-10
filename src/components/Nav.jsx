import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../utils/Context';

const Nav = () => {
  const productContext = useContext(ProductContext);
  const products = productContext ? productContext.products : [];

  const distinctCategories = useMemo(() => 
    [...new Set(products.map(product => product.category))],
    [products]
  );

  const getColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.4)`;
  }

  return (
    <nav className='w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5 '>
      <Link className='py-2 px-5 border rounded border-blue-200 text-blue-300' to="/Create">Add New Product</Link>
      <hr className='my-3 w-[80%]' />
      <h1 className='text-2xl mb-3 w-[80%]'>Category Filter</h1>
      <div className='w-[80%]'>
        <Link to={`/`} className='flex items-center mb-3'> 
          <span className='rounded-full mr-2 w-[15px] h-[15px] bg-blue-100'></span>{" "}
          All Categories
        </Link>
        {distinctCategories.map((category, index) => (
          <Link key={index} to={`/?category=${category}`} className='flex items-center mb-3'> 
            <span 
              style={{backgroundColor: getColor()}}
              className='rounded-full mr-2 w-[15px] h-[15px]'
            ></span>{" "}
            {category}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Nav