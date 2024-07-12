import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const getAllProducts = () => products;

  const getProductById = (id) => products.find(p => p.id === id || p.id === Number(id));

  const getProductsByCategory = (category) => products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, { ...newProduct, id: Date.now().toString() }];
    setProducts(updatedProducts);
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map(p => 
      p.id === id || p.id === Number(id) ? { ...p, ...updatedProduct } : p
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id && p.id !== Number(id));
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider value={{
      products,
      isLoading,
      getAllProducts,
      getProductById,
      getProductsByCategory,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default Context;