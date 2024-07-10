import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import Loading from "./Loading";

const Details = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     console.log(data);
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getSingleProduct();
  // }, [id]);


  return product ? (
    <div className="w-[70%] h-full flex items-center justify-center m-auto p-[10%]">
      <img
        className="h-[35vh] w-[30vh] mr-12 bg-contain bg-no-repeat bg-center"
        src={product.image}
        alt={product.title}
      />
      <div className="content flex flex-col w-[50%]">
        <h1 className="text-red-900 text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 mt-2">{product.category}</h3>
        <h2 className="mt-2">${product.price}</h2>
        <p className="mt-1">{product.description}</p>
        <div className="flex gap-5 mt-5">
          <Link to={`/edit/${id}`} className="py-2 px-5 border rounded border-blue-200 text-blue-300">
            Edit
          </Link>
          <Link to={`/delete/${id}`} className="py-2 px-5 border rounded border-blue-200 text-blue-300">
            Delete
          </Link>
        </div>
      </div>
    </div>
  ) : ( 
    <Loading />
  );
};

export default Details;