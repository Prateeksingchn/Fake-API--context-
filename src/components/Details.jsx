import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";

const Details = () => {
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    setProduct(fetchedProduct);
  }, [id, getProductById]);

  const ProductDeleteHandler = () => {
    if (product) {
      deleteProduct(product.id);
      navigate("/");
      toast.success("Product deleted successfully");
    }
  };

  if (!product) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto my-40 p-6 bg-white rounded-lg ">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            className="w-full h-80 object-contain rounded-lg"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{product.category}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex space-x-4">
            <Link
              to={`/edit/${id}`}
              className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              <Edit size={20} className="mr-2" />
              Edit
            </Link>
            <button
              onClick={ProductDeleteHandler}
              className="flex items-center justify-center py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              <Trash2 size={20} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;