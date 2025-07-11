import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-white border-t border-gray-100 mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
          {/* Logo Section */}
          <div className='lg:col-span-2'>
            <Link to='/' className="flex items-center gap-3 group mb-6">
              <span className="bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-600 text-white rounded-full px-4 py-2 text-2xl font-black shadow-lg transition-transform duration-200 group-hover:scale-110 group-hover:shadow-xl border-4 border-white">
                F
              </span>
              <div className="flex flex-col">
                <h1 className='text-gray-800 font-extrabold text-3xl sm:text-4xl tracking-wider group-hover:scale-105 transition-transform duration-200 drop-shadow-lg'>
                  Fashnology
                </h1>
                <span className="text-xs sm:text-sm text-gray-400 font-semibold tracking-widest pl-1 mt-1 uppercase group-hover:text-blue-500 transition-colors duration-200">
                  Style Meets Technology
                </span>
              </div>
            </Link>

            <p className='text-gray-600 leading-relaxed max-w-md'>
              Discover the perfect blend of fashion and technology at Fashnology. We bring you the latest trends in men's and women's clothing, combining style, comfort, and innovation for every season. Shop with confidence and elevate your wardrobe today!
            </p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-6'>Company</h3>
            <ul className='space-y-3'>
              <li>
                <Link to="/" className='text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About" className='text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/Collection" className='text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/Contact" className='text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-6'>Get in Touch</h3>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2 text-gray-600'>
                <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                <a href="tel:+201000540964" className='hover:text-blue-500 transition-colors duration-200'>
                  +20 100 054 0964
                </a>
              </li>
              <li className='flex items-center gap-2 text-gray-600'>
                <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                <a href="mailto:Contact@Fashnology.com" className='hover:text-blue-500 transition-colors duration-200'>
                  Contact@Fashnology.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-100 mt-12 pt-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-gray-600 text-center sm:text-left'>
              © 2025 Fashnology. All rights reserved.
            </p>
            <div className='flex gap-6 text-sm'>
              <Link to="/" className='text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                Privacy Policy
              </Link>
              <Link to="/" className='text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer