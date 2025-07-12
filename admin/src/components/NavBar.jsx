import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({setToken}) => {
  return (
    <div className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 flex justify-between px-4 py-3 items-center'>
      <Link to='/' className="flex items-center gap-2 sm:gap-3 group">
        <span className="bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-600 text-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-lg sm:text-2xl font-black shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl border-2 sm:border-4 border-white">
          F
        </span>
        <div className="flex flex-col">
          <h1 className='text-gray-800 font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-wider group-hover:scale-105 transition-transform duration-200 drop-shadow-lg'>
            Fashnology
          </h1>
          <span className="text-xs sm:text-sm text-gray-400 font-semibold tracking-widest pl-1 mt-0.5 sm:mt-1 uppercase group-hover:text-blue-500 transition-colors duration-200">
            admin panel
          </span>
        </div>
      </Link>
      <button 
        className='bg-gray-800 hover:bg-red-600 h-8 sm:h-10 w-[80px] sm:w-[100px] text-white rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base' 
        onClick={()=>setToken('')}
      >
        Logout
      </button>
    </div>
  )
}

export default NavBar