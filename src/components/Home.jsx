import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import { Search } from "lucide-react";

const Home = () => {  
  const { getAllProducts, getProductsByCategory, isLoading } = useContext(ProductContext);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const category = params.get('category') || '';
  const searchTerm = params.get('search') || '';

  const [displayProducts, setDisplayProducts] = useState([]);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    let products;
    if (category && category !== "undefined") {
      products = getProductsByCategory(category);
    } else {
      products = getAllProducts();
    }

    if (searchTerm) {
      products = products.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDisplayProducts(products);
  }, [category, searchTerm, getAllProducts, getProductsByCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearch = new URLSearchParams(search);
    newSearch.set('search', localSearchTerm);
    window.history.pushState({}, '', `${window.location.pathname}?${newSearch}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return !isLoading ? (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 absolute lg:left-[15%] xl:left-[15%] md:left-[27%] sm:left-[15%]    ">
      <Nav className="w-full md:w-64 flex-shrink-0" />
      <div className="flex-grow p-4 md:p-8">
        <form onSubmit={handleSearch} className="mb-6 flex justify-end md:justify-end">
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-[40%] md:w-60  px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="lg:px-4 md:px-4 px-2 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search size={20} />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayProducts.map((p) => ( 
            <Link 
              key={p.id}
              to={`/details/${p.id}`}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="w-full h-48 bg-contain bg-no-repeat bg-center transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h2 className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
                {p.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;