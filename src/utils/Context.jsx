import axios from "axios";
import React, { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  )
};

export default Context;