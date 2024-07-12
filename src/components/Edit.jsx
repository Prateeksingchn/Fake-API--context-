import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { getProductById, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      setError("Product not found");
      setTimeout(() => navigate('/'), 3000);
    }
  }, [id, getProductById, navigate]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) || "" : value
    }));
  };

  const updateProductHandler = (e) => {
    e.preventDefault();
    setError("");

    if (
      product.title.trim().length < 3 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 3 ||
      isNaN(parseFloat(product.price)) ||
      product.description.trim().length < 5
    ) {
      setError("Please fill all the fields correctly");
      return;
    }

    const updatedProduct = {
      ...product,
      price: parseFloat(product.price),
    };

    updateProduct(id, updatedProduct);
    navigate("/");
  };

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  return (
    <form
      onSubmit={updateProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={changeHandler}
        value={product.image}
        required
      />
      <input
        type="text"
        placeholder="Title"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={changeHandler}
        value={product.title}
        required
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="category"
          onChange={changeHandler}
          value={product.category}
          required
        />
        <input
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={changeHandler}
          value={product.price}
          required
          step="0.01"
        />
      </div>
      <textarea
        name="description"
        onChange={changeHandler}
        placeholder="enter product description here..."
        value={product.description}
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows={10}
        required
      ></textarea>
      <div className="w-1/2">
        <button type="submit" className="py-2 px-5 border rounded border-blue-200 text-blue-300">
          Update Product
        </button>
      </div>
      {error && <div className="text-red-500 mt-3">{error}</div>}
    </form>
  );
};

export default Edit;