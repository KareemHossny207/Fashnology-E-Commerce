import React, { useState } from 'react'
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify"
import axios from "axios"
const Create = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subcategory, setSubcategory] = useState('Shirts')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onsubmithandler = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!description.trim()) {
      toast.error('Product description is required');
      return;
    }
    if (!price || price <= 0) {
      toast.error('Valid price is required');
      return;
    }
    if (sizes.length === 0) {
      toast.error('At least one size must be selected');
      return;
    }
    if (!image1) {
      toast.error('At least one image is required');
      return;
    }

    try {
      const formData = new FormData()

      formData.append("name", name.trim())
      formData.append("description", description.trim())
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subcategory", subcategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      // Only append images if they exist
      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      const response = await axios.post('https://backende-commerce-kappa.vercel.app/api/product/Create', formData, {
        headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.success) {
        toast.success(response.data.message)
        // Reset all form fields
        setName("")
        setDescription("")
        setPrice("")
        setCategory('Men')
        setSubcategory('Shirts')
        setBestseller(false)
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to create product. Please try again.')
      }
    }
  }
  return (
    <form onSubmit={onsubmithandler} className="max-w-4xl mx-auto mt-6 p-6 lg:p-8 bg-white rounded-xl shadow-lg flex flex-col gap-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Create New Product</h2>
        <p className="text-gray-600">Upload product images and details</p>
      </div>
      
      {/* Image Upload Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label htmlFor="image1" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
            <MdCloudUpload className="text-3xl lg:text-4xl text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-gray-500 mb-1">Image 1</span>
            <span className="text-xs text-gray-400">Click to upload</span>
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden accept="image/*" />
        </label>
          <label htmlFor="image2" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
            <MdCloudUpload className="text-3xl lg:text-4xl text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-gray-500 mb-1">Image 2</span>
            <span className="text-xs text-gray-400">Click to upload</span>
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden accept="image/*" />
        </label>
          <label htmlFor="image3" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
            <MdCloudUpload className="text-3xl lg:text-4xl text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-gray-500 mb-1">Image 3</span>
            <span className="text-xs text-gray-400">Click to upload</span>
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden accept="image/*" />
        </label>
          <label htmlFor="image4" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
            <MdCloudUpload className="text-3xl lg:text-4xl text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-gray-500 mb-1">Image 4</span>
            <span className="text-xs text-gray-400">Click to upload</span>
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden accept="image/*" />
        </label>
      </div>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className='w-full'>
          <label className='block mb-2 text-sm font-semibold text-gray-700'>Product Name</label>
          <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter product name' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200'/>
        </div>
      <div className='w-full'>
          <label className='block mb-2 text-sm font-semibold text-gray-700'>Product Price</label>
          <input onChange={(e)=>setPrice(e.target.value)} type="Number" placeholder='25.00' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200'/>
        </div>
      </div>

      <div className='w-full'>
        <label className='block mb-2 text-sm font-semibold text-gray-700'>Product Description</label>
        <textarea onChange={(e)=>setDescription(e.target.value)} placeholder='Enter product description' rows="3" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none'/>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <label className='block mb-2 text-sm font-semibold text-gray-700'>Product Category</label>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all duration-200'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
                <div>
          <label className='block mb-2 text-sm font-semibold text-gray-700'>Subcategory</label>
          <select onChange={(e) => setSubcategory(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all duration-200'>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Shirts">Shirts</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Dresses">Dresses</option>
          </select>
        </div>
      </div>

      <div className='w-full'>
        <label className='block mb-3 text-sm font-semibold text-gray-700'>Available Sizes</label>
        <div className='flex flex-wrap gap-3'>
          {['S', 'M', 'Lg', 'Xl', 'XXl'].map((size) => (
            <div 
              key={size}
              onClick={()=>setSizes(prev=>prev.includes(size)?prev.filter(item=>item!==size): [...prev,size])} 
              className={`flex items-center justify-center cursor-pointer px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium min-w-[60px] ${
                sizes.includes(size) 
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              {size}
          </div>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' className='w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'/>
        <label htmlFor="bestseller" className='text-sm font-medium text-gray-700 cursor-pointer'>Add to bestseller collection</label>
      </div>

      <button type='submit' className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
        Create Product
      </button>
    </form>
  )
}

export default Create