import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";

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
      price,
      description,
    };

    addProduct(newProduct);
    navigate("/");

    setTitle("");
    setImage("");
    setCategory("");
    setPrice("");
    setDescription("");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen "
    >
      <h1 className="mb-5 w-1/2 text-3xl">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setdescription(e.target.value)}
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
