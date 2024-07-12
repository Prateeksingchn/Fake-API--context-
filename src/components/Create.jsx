import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Please fill all the fields");
      return;
    }

    const newProduct = {
      title,
      image,
      category,
      price: Number(price),
      description,
    };
    
    toast.success("Product added successfully");
    addProduct(newProduct);
    navigate("/");
  };

  return (
    <form onSubmit={AddProductHandler} className="flex flex-col items-center p-[5%] w-screen h-screen">
      <h1 className="mb-5 w-1/2 text-3xl">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="enter product description here..."
        value={description}
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows={10}
      ></textarea>
      <div className="w-1/2">
        <button className="py-2 px-5 border rounded border-blue-200 text-blue-300">
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;