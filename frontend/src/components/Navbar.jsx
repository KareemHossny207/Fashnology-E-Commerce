import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import { NavLink, Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { MdSupervisorAccount } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

// Custom NavLink component for desktop
const CustomNavLink = ({ to, children }) => (
  <NavLink
    className={({ isActive }) =>
      `flex flex-col items-center gap-1 transition-colors duration-200 px-2 ${
        isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-500'
      }`
    }
    to={to}
  >
    {({ isActive }) => (
      <>
        <span className="tracking-wide">{children}</span>
        <hr
          className={`w-2/4 border-none h-[2px] transition-all duration-200 ${
            isActive ? 'bg-blue-600' : 'bg-transparent'
          }`}
        />
      </>
    )}
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setShowsearchbar, getCartCount, navigate, token, setToken, setCartitems } = useContext(Context);

  const logout = () => {
    navigate('/Login');
    localStorage.removeItem('token');
    setToken('');
    setCartitems({});
    setIsOpen(false);
  };

  // Responsive: lock scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <span className="bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-600 text-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xl sm:text-2xl font-black shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl border-4 border-white">
              F
            </span>
            <div className="flex flex-col min-w-0">
              <h1 className="text-gray-800 font-extrabold text-lg sm:text-2xl lg:text-3xl tracking-wider group-hover:scale-105 transition-transform duration-200 drop-shadow-lg truncate">
                Fashnology
              </h1>
              <span className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-widest pl-1 mt-0.5 uppercase group-hover:text-blue-500 transition-colors duration-200 truncate">
                Style Meets Technology
              </span>
            </div>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-4 lg:gap-8 text-gray-700 font-semibold text-sm lg:text-base items-center">
            <CustomNavLink to="/">HOME</CustomNavLink>
            <CustomNavLink to="/Collection">COLLECTION</CustomNavLink>
            <CustomNavLink to="/About">ABOUT</CustomNavLink>
            <CustomNavLink to="/Contact">CONTACT</CustomNavLink>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <button
                    onClick={() => { setShowsearchbar(true); navigate('/Collection'); }}
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Search"
            >
              <CiSearch className="text-xl sm:text-2xl" />
            </button>

            <div className="relative group flex items-center">
              <button
                className="text-gray-600 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Account"
              >
                <MdSupervisorAccount
                  className="text-xl sm:text-2xl"
                  onClick={() => {
                    if (!token) {
                      navigate('/Login');
                    }
                  }}
                />
              </button>
              {/* Dropdown for account */}
              {token && (
                <div className="hidden group-hover:block absolute right-0 top-10 pt-2 z-50 min-w-[160px]">
                  <div className="flex flex-col gap-2 w-40 py-3 px-4 bg-white border border-gray-200 rounded-xl shadow-lg text-gray-600 text-sm">
                    <p className="hover:text-blue-500 cursor-pointer transition-colors duration-200 py-1">My Profile</p>
                    <Link to="/Orders" onClick={() => setIsOpen(false)}>
                      <p className="hover:text-blue-500 cursor-pointer transition-colors duration-200 py-1">Orders</p>
                    </Link>
                    <hr className="border-gray-200 my-1" />
                    <p
                      onClick={logout}
                      className="hover:text-red-600 cursor-pointer transition-colors duration-200 py-1"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/Card"
              className="relative group p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-gray-600 group-hover:text-blue-500 transition-colors duration-200 text-xl sm:text-2xl" />
              <span className="absolute -top-1.5 -right-0 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-semibold border-2 border-white">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-gray-600 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Open menu"
            >
              <RiMenu3Line className="text-xl sm:text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden">
          <div className="relative w-4/5 max-w-xs bg-white shadow-xl h-full flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Close menu"
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <ul className="flex flex-col gap-1 px-4 py-6">
              <NavLink
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
                to="/Collection"
              >
                COLLECTION
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
                to="/About"
              >
                ABOUT
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
                to="/Contact"
              >
                CONTACT
              </NavLink>
              <div className="flex items-center gap-3 mt-6 px-2">
                <button
                  onClick={() => {
                    setShowsearchbar(true);
                    setIsOpen(false);
                    navigate('/Collection')
                  }}
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full"
                  aria-label="Search"
                >
                  <CiSearch className="text-xl" />
                </button>
                <button
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full"
                  aria-label="Account"
                  onClick={() => {
                    if (!token) {
                      setIsOpen(false);
                      navigate('/Login');
                    }
                  }}
                >
                  <MdSupervisorAccount className="text-xl" />
                </button>
                <Link
                  to="/Card"
                  className="relative group p-2 rounded-full"
                  aria-label="Cart"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingCart className="text-gray-600 group-hover:text-blue-500 transition-colors duration-200 text-xl" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-semibold border-2 border-white">
                    {getCartCount()}
                  </span>
                </Link>
              </div>
              {token && (
                <div className="mt-4 flex flex-col gap-2 w-full py-3 px-2 bg-gray-50 border border-gray-200 rounded-xl shadow text-gray-600 text-sm">
                  <p className="hover:text-blue-500 cursor-pointer transition-colors duration-200 py-1">My Profile</p>
                  <Link to="/Orders" onClick={() => setIsOpen(false)}>
                    <p className="hover:text-blue-500 cursor-pointer transition-colors duration-200 py-1">Orders</p>
                  </Link>
                  <hr className="border-gray-200 my-1" />
                  <p
                    onClick={logout}
                    className="hover:text-red-600 cursor-pointer transition-colors duration-200 py-1"
                  >
                    Logout
                  </p>
                </div>
              )}
            </ul>
          </div>
          {/* Click outside to close */}
          <div
            className="flex-1"
            onClick={() => setIsOpen(false)}
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;