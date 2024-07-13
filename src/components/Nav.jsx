import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import { PlusCircle, Menu, X } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const productContext = useContext(ProductContext);
  const products = productContext ? productContext.products : [];

  const distinctCategories = useMemo(
    () => [...new Set(products.map(product => product.category))],
    [products]
  );

  const getColor = () => {
    return `hsl(${Math.random() * 360}, 70%, 80%)`;
  };

  const categoryColors = useMemo(
    () => distinctCategories.reduce((acc, category) => {
      acc[category] = getColor();
      return acc;
    }, {}),
    [distinctCategories]
  );

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-blue-500 text-white rounded-md"
        onClick={toggleNav}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`
        w-64 h-full bg-white shadow-lg flex flex-col items-start p-6 fixed left-0 top-0 
        transform transition-transform duration-300 ease-in-out z-10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
      `}>
        <hr className="my-4 w-full mt-8 lg:hidden" />
        <Link
          className="mb-6 lg:mb-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
          to="/Create"
        >
          <PlusCircle className="mr-2" size={18} />
          Add New Product
        </Link>
        
        <hr className="my-4 w-full border-t border-gray-200" />
        
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Category Filter</h1>
        
        <div className="w-full space-y-2 overflow-y-auto">
          <CategoryLink
            to="/"
            label="All Categories"
            color="bg-blue-100"
            isFixed={true}
            onClick={() => setIsOpen(false)}
          />
          {distinctCategories.map((category, index) => (
            <CategoryLink
              key={index}
              to={`/?category=${category}`}
              label={category}
              color={categoryColors[category]}
              isFixed={false}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </nav>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleNav}
        ></div>
      )}
    </>
  );
};

const CategoryLink = ({ to, label, color, isFixed, onClick }) => (
  <Link
    to={to}
    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-200 w-full"
    onClick={onClick}
  >
    <span 
      className={`rounded-full mr-3 w-3 h-3 ${isFixed ? color : ''}`}
      style={isFixed ? {} : { backgroundColor: color }}
    />
    <span className="text-gray-700 hover:text-gray-900">{label}</span>
  </Link>
);

export default Nav;