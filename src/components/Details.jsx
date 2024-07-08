import React from "react";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <div className="w-[70%] h-full flex items-center justify-center m-auto p-[10%]">
      <img
        className="h-[60vh] w-[50vh] mr-12 bg-contain bg-no-repeat bg-center"
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        alt=""
      />
      <div className="content flex flex-col">
        <h1 className="text-red-900 text-4xl">
          Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
        </h1>
        <h3 className="text-zinc-400 mt-2">men's clothing</h3>
        <h2 className="mt-2">$109.95</h2>
        <p className="mt-1">
          Your perfect pack for everyday use and walks in the forest. Stash your
          laptop (up to 15 inches) in the padded sleeve, your everyday
        </p>
        <div className="flex gap-5 mt-5">
          <Link className="py-2 px-5 border rounded border-blue-200 text-blue-300">
            Edit
          </Link>
          <Link className="py-2 px-5 border rounded border-blue-200 text-blue-300">
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
