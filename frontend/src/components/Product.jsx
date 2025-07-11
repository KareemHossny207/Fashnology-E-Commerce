import React from 'react'
import {Context} from '../Context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Product = ({id,image,name,price}) => {
  const {currency}=useContext(Context);
  
  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                Quick View
              </span>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm lg:text-base mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors duration-200">
            {name}
          </h3>
          <p className="font-bold text-lg text-gray-900">
            {currency}{price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Product