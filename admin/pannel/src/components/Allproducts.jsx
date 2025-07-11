import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"

const Allproducts = ({token}) => {
  const [list, setList] = useState([]);

  const fetchAll = async () => {
    try {
      const response = await axios.get('http://localhost:5777/api/product/all');
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }    
  } 
const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5777/api/product/${id}`,{headers:{token}});
    if (response.data.success) {
      toast.success('Product deleted successfully');
      fetchAll(); // Refresh the list after deletion
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}
  useEffect(() => {
    fetchAll();
  }, [])

  return (
    <>
      <div className="my-4">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">All Orders</h2>
        <hr className="border-t border-gray-300" />
      </div>
        <div className="w-full overflow-x-auto">
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 rounded-t-lg items-center py-2 px-4 text-sm font-semibold text-gray-700 border-b border-gray-200">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className="text-center">Action</span>
          </div>
          <div className="flex flex-col gap-2">
            {list.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-2 border-b border-gray-100 bg-white hover:bg-gray-50 transition"
              >
                {/* Image */}
                <div className="flex justify-center w-full md:w-auto mb-2 md:mb-0">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded shadow-sm border"
                  />
                </div>
                {/* Name */}
                <div className="w-full md:w-auto text-center md:text-left mb-1 md:mb-0">
                  <span className="font-medium text-gray-800">{item.name}</span>
                </div>
                {/* Category */}
                <div className="w-full md:w-auto text-center md:text-left mb-1 md:mb-0">
                  <span className="text-gray-600">{item.category}</span>
                </div>
                {/* Price */}
                <div className="w-full md:w-auto text-center md:text-left mb-1 md:mb-0">
                  <span className="text-blue-700 font-semibold">${item.price}</span>
                </div>
                {/* Action */}
                <div className="w-full md:w-auto flex justify-center">
                  <button
                    className="text-red-500 hover:text-red-700 font-bold px-3 py-1 rounded transition"
                    onClick={() => deleteProduct(item._id)}
                    title="Delete Product"
                  >
                    X
                  </button>
                </div>
                {/* Mobile labels */}
                <div className="flex md:hidden flex-wrap w-full text-xs text-gray-400 mt-2 gap-x-4 gap-y-1">
                  <span><b>Name:</b> {item.name}</span>
                  <span><b>Category:</b> {item.category}</span>
                  <span><b>Price:</b> ${item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Allproducts