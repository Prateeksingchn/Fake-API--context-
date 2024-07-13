import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const { getProductById, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
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
      setFormData(fetchedProduct);
    } else {
      setError("Product not found");
      setTimeout(() => navigate('/'), 3000);
    }
  }, [id, getProductById, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? value : value,
    }));
  };

  const validateForm = () => {
    const { title, image, category, price, description } = formData;
    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 3 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      toast.error("Please fill all the fields correctly");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedProduct = {
      ...formData,
      price: Number(formData.price),
    };
    
    updateProduct(id, updatedProduct);
    toast.success("Product updated successfully");
    navigate("/");
  };

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* product details */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
              Edit Product
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="url"
                  name="image"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Image URL"
                  onChange={handleInputChange}
                  value={formData.image}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="title"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                  onChange={handleInputChange}
                  value={formData.title}
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="category"
                  required
                  className="appearance-none rounded-md relative block w-1/2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Category"
                  onChange={handleInputChange}
                  value={formData.category}
                />
                <input
                  type="number"
                  name="price"
                  required
                  className="appearance-none rounded-md relative block w-1/2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Price"
                  onChange={handleInputChange}
                  value={formData.price}
                  step="0.01"
                />
              </div>
              <div>
                <textarea
                  name="description"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 pt-2 pb-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter product description here..."
                  rows={4}
                  onChange={handleInputChange}
                  value={formData.description}
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>

          {/* Product Image */}
          <div className="w-full md:w-1/2 bg-white">
            <img
              className="w-[400px] h-[400px] object-contain mt-10"
              src={formData.image || "https://images.unsplash.com/photo-1720643710112-6bc7f98621bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D"}
              alt="Product"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;