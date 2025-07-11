import React, { useContext } from 'react'
import { Context } from '../Context';
import {NavLink , Link}from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { MdSupervisorAccount } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';

// Custom NavLink component that handles active state properly
const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink 
      className={({ isActive }) => 
        `flex flex-col items-center gap-1 transition-colors duration-200 ${
          isActive ? 'text-blue-500' : 'hover:text-blue-500'
        }`
      } 
      to={to}
    >
      {({ isActive }) => (
        <>
          <p>{children}</p>
          <hr className={`w-2/4 border-none h-[2px] transition-all duration-200 ${
            isActive ? 'bg-blue-500' : 'bg-transparent'
          }`}/>
        </>
      )}
    </NavLink>
  );
};

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const {setShowsearchbar, getCartCount,navigate,token,setToken ,setCartitems }=useContext(Context);
const logout=()=>{
  navigate('/Login')
  localStorage.removeItem('token')
  setToken('')
  setCartitems({})
}


  return (
    <nav className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
      {/* logo */}
      <Link to='/' className="flex items-center gap-3 group">
            <span className="bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-600 text-white rounded-full px-4 py-2 text-2xl font-black shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl border-4 border-white">
          F
        </span>
        <div className="flex flex-col">
              <h1 className='text-gray-800 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-wider group-hover:scale-105 transition-transform duration-200 drop-shadow-lg'>
            Fashnology
          </h1>
              <span className="text-xs sm:text-sm text-gray-400 font-semibold tracking-widest pl-1 mt-1 uppercase group-hover:text-blue-500 transition-colors duration-200">
            Style Meets Technology
          </span>
        </div>
      </Link>

          {/* Desktop menu */}
          <ul className='hidden sm:flex gap-8 text-gray-700 font-semibold text-sm lg:text-base'>
            <CustomNavLink to="/">HOME</CustomNavLink>
            <CustomNavLink to="/Collection">COLLECTION</CustomNavLink>
            <CustomNavLink to="/About">ABOUT</CustomNavLink>
            <CustomNavLink to="/Contact">CONTACT</CustomNavLink>
</ul>

{/* icons */}
          <div className='flex items-center gap-4 lg:gap-6'>
          <Link to={'/Collection'}>
                      <button 
              onClick={()=>setShowsearchbar(true)} 
              className='text-gray-600 hover:text-blue-500 transition-colors duration-200'
            >
              <CiSearch className='text-2xl'/>
            </button>
          </Link>

            <div className="group relative flex items-center">
              <button className='text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                <MdSupervisorAccount className='text-2xl' onClick={() => {
                  if (!token) {
                    navigate('/Login');
                  }
                }}/>
              </button>
                {token &&
                              <div className="group-hover:block hidden absolute right-0 bottom-[-120px] pt-4 z-50">
                              <div className="flex flex-col gap-2 w-40 py-3 px-4 bg-white border border-gray-200 rounded-xl shadow-lg text-gray-600 text-sm">
                                <p className='hover:text-blue-500 cursor-pointer transition-colors duration-200 py-1'>My Profile</p>
                                <Link to={'/Orders'}>
                                <p className='hover:text-blue-500 cursor-pointer transition-colors duration-200 py-1'>Orders</p>
                                </Link>
                                <hr className='border-gray-200 my-1'/>
                                <p onClick={logout} className=' hover:text-red-600 cursor-pointer transition-colors duration-200 py-1'>Logout</p>
                      </div>
                     </div>

                }
      </div>

            <Link to="/Card" className='relative group'>
              <FaShoppingCart className='text-gray-600 group-hover:text-blue-500 transition-colors duration-200 text-2xl'/>
              <span className='absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-semibold'>
                {getCartCount()}
              </span>
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={()=>setIsOpen(true)} 
            className='sm:hidden text-gray-600 hover:text-blue-500 transition-colors duration-200'
          >
            <RiMenu3Line className='text-2xl'/>
          </button>
        </div>
      </div>
      </div>

  {/* mobile menu */}
  {isOpen && (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden'>
      <div className='absolute top-0 bottom-0 left-0 bg-white w-80 max-w-[80vw] shadow-xl'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-xl font-bold text-gray-900'>Menu</h2>
            <button 
              onClick={()=>setIsOpen(false)} 
              className='text-gray-600 hover:text-blue-500 transition-colors duration-200'
            >
              <IoMdClose className='text-2xl'/>
            </button>
          </div>
          
          <ul className='flex flex-col gap-1'>
            <NavLink 
              className={({ isActive }) => 
                `py-3 px-4 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
                }`
              } 
              onClick={()=>setIsOpen(false)} 
              to="/"
            >
              HOME
            </NavLink>
            <NavLink 
              className={({ isActive }) => 
                `py-3 px-4 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
                }`
              } 
              onClick={()=>setIsOpen(false)} 
              to="/Collection"
            >
              COLLECTION
            </NavLink>
            <NavLink 
              className={({ isActive }) => 
                `py-3 px-4 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
                }`
              } 
              onClick={()=>setIsOpen(false)} 
              to="/About"
            >
              ABOUT
            </NavLink>
            <NavLink 
              className={({ isActive }) => 
                `py-3 px-4 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
                }`
              } 
              onClick={()=>setIsOpen(false)} 
              to="/Contact"
            >
              CONTACT
            </NavLink>
      </ul>
        </div>
      </div>
    </div>
  )}
    </nav>
  );
}

export default Navbar