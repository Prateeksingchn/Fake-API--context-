import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Details from "./components/Details";
import Edit from "./components/Edit";
import { Link } from "react-router-dom";

const App = () => {
  const { search, pathname } = useLocation();
  console.log(search, pathname);

  const showHomeLink =
    pathname !== "/" || search.length > 0 || pathname.startsWith("/details") || pathname.startsWith("/Create") || pathname.startsWith("/edit");

  return (
    <div className="h-full w-full flex">
      {showHomeLink && (
        <Link
          to="/"
          className="absolute lg:left-[17.5%] lg:top-[2.5%] md:left-[30.6%] md:top-8 left-[20%] top-[2%] text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md z-10"
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            HOME
          </span>
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;