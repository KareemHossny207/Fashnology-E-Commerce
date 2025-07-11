import React from 'react'
import {Link} from "react-router-dom"
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaThList } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaTachometerAlt } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="h-full min-h-screen w-48 lg:w-60 bg-gray-800 py-4 lg:py-6 flex flex-col gap-6 lg:gap-10 shadow-lg">
      <Link
        to="/"
        className="focus:bg-white focus:text-gray-800 mt-6 lg:mt-10 flex items-center gap-2 lg:gap-3 text-white py-2.5 lg:py-3 px-3 lg:px-4 hover:bg-white hover:text-gray-800 transition-all duration-200 font-medium hover:shadow-md rounded-lg mx-2"
      >
        <FaTachometerAlt className="text-lg lg:text-xl"/>
        <span className="text-sm lg:text-base">Dashboard</span>
      </Link>
      <Link
        to="/Create"
        className="focus:bg-white focus:text-gray-800 flex items-center gap-2 lg:gap-3 text-white py-2.5 lg:py-3 px-3 lg:px-4 hover:bg-white hover:text-gray-800 transition-all duration-200 font-medium hover:shadow-md rounded-lg mx-2"
      >
        <IoMdAddCircleOutline className="text-lg lg:text-xl"/>
        <span className="text-sm lg:text-base">Create Product</span>
      </Link>
      <Link
        to="/All"
        className="focus:bg-white focus:text-gray-800 flex items-center gap-2 lg:gap-3 text-white py-2.5 lg:py-3 px-3 lg:px-4 hover:bg-white hover:text-gray-800 transition-all duration-200 font-medium hover:shadow-md rounded-lg mx-2"
      >
        <FaThList className="text-lg lg:text-xl"/>
        <span className="text-sm lg:text-base">All Products</span>
      </Link>
      <Link
        to="/Orders"
        className="focus:bg-white focus:text-gray-800 flex items-center gap-2 lg:gap-3 text-white py-2.5 lg:py-3 px-3 lg:px-4 hover:bg-white hover:text-gray-800 transition-all duration-200 font-medium hover:shadow-md rounded-lg mx-2"
      >
        <FaClipboardList className="text-lg lg:text-xl"/>
        <span className="text-sm lg:text-base">Orders</span>
      </Link>
    </div>
  )
}

export default SideBar