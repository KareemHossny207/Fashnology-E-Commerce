import React from 'react'

const Start = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden my-8">
      <div className="flex flex-col-reverse md:flex-row min-h-[250px] md:min-h-[350px]">
        {/* Left Section - Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-10 lg:p-12 bg-white">
          <div className="text-center md:text-left max-w-md w-full">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <div className="w-6 sm:w-8 h-[2px] bg-gray-700"></div>
              <span className="text-xs sm:text-sm font-medium tracking-wider text-gray-600">OUR BESTSELLERS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-gray-800 mb-3 sm:mb-4">
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              <a
                href="#collection"
                className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wide hover:underline"
              >
                SHOP NOW
              </a>
              <div className="w-8 sm:w-12 h-[2px] bg-gray-700"></div>
            </div>
          </div>
        </div>
        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="images\joyful-girl-lush-white-skirt-looking-down-with-inspired-smile-refined-brunette-lady-long-warm-scarf-dreamy-posing-purple-wall_197531-7937.avif"
            alt="Model"
            className="w-full h-[180px] xs:h-[220px] sm:h-[260px] md:h-[350px] object-cover object-center transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}

export default Start