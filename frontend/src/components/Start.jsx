import React from 'react'

const Start = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden my-8">
      <div className="flex flex-col sm:flex-row min-h-[350px]">
        {/* Left Section - Content */}
        <div className='w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white'>
          <div className='text-center lg:text-left max-w-md w-full'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='w-8 h-[2px] bg-gray-700'></div>
              <span className='text-sm font-medium tracking-wider text-gray-600'>OUR BESTSELLERS</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-serif font-semibold text-gray-800 mb-4'>
              Latest Arrivals
            </h1>
            <div className='flex items-center gap-2 mt-2'>
              <a href='#collection' className='text-sm font-semibold text-gray-600 tracking-wide hover:underline'>SHOP NOW</a>
              <div className='w-12 h-[2px] bg-gray-700'></div>
            </div>
          </div>
        </div>
        {/* Right Section - Image */}
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <img 
            src="/images/inspired-romantic-woman-with-short-hair-dancing-studio-long-white-skirt-joyful-brunette-girl-knitted-oversize-sweater-spending-time-photoshoot_197531-25316.avif" 
            alt="Model" 
            className="w-full h-[350px] object-cover object-center" 
          />
        </div>
      </div>
    </div>
  )
}

export default Start