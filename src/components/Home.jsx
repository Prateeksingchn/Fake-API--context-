import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";

const Home = () => {  
  const { getAllProducts, getProductsByCategory, isLoading } = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split('=')[1]);

  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    if (category && category !== "undefined") {
      setDisplayProducts(getProductsByCategory(category));
    } else {
      setDisplayProducts(getAllProducts());
    }
  }, [category, getAllProducts, getProductsByCategory]);

  return !isLoading ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[3%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {displayProducts.map((p) => ( 
          <Link 
            key={p.id}
            to={`/details/${p.id}`}
            className="mr-3 mb-3 card p-3 border shadow-sm rounded-xl w-[24.1%] h-[34vh] flex flex-col justify-center items-center">
            <div
              className="w-full h-[60%] bg-contain bg-no-repeat bg-center transition-transform duration-300 hover:scale-105"
              style={{
                backgroundImage: `url(${p.image})`,
              }}
            ></div>
            <h1 className="hover:text-blue-500 duration-300 mt-4">
              {p.title}
            </h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
