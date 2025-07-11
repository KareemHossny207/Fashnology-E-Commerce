import React from 'react'
import { RiExchangeFundsFill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdHeadsetMic } from "react-icons/md";

const Policy = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Easy Exchange Policy */}
          <div className='text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <RiExchangeFundsFill className='text-blue-500 text-2xl' />
            </div>
            <h3 className='font-semibold text-lg text-gray-900 mb-3'>Easy Exchange Policy</h3>
            <p className='text-gray-600 leading-relaxed'>We offer free exchange policy for all our products</p>
          </div>

          {/* 7 Days Return Policy */}
          <div className='text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <IoCheckmarkDoneCircle className='text-green-600 text-2xl' />
            </div>
            <h3 className='font-semibold text-lg text-gray-900 mb-3'>7 Days Return Policy</h3>
            <p className='text-gray-600 leading-relaxed'>We provide 7 days free return policy</p>
          </div>

          {/* Best Customer Support */}
          <div className='text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
            <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <MdHeadsetMic className='text-purple-600 text-2xl' />
            </div>
            <h3 className='font-semibold text-lg text-gray-900 mb-3'>Best Customer Support</h3>
            <p className='text-gray-600 leading-relaxed'>We provide 24/7 customer support</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Policy