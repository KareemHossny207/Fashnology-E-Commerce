import React from 'react'
import Title from "./Title"
import Box from './Box'
const About = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='text-center'>
      <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='flex items-center justify-center'>
        <div className='max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 bg-white rounded-2xl shadow-sm p-8'>
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex-shrink-0'>
            <img
              src='images\pexels-ioanamtc-10122507.jpg'
              alt='Spring Wardrobe'
              className='w-full h-80 md:h-[400px] object-cover rounded-xl shadow-md'
              loading="lazy"
            />
          </div>
          {/* Text Section */}
          <div className='w-full md:w-1/2 flex flex-col items-center justify-center text-center'>
            <p className='text-gray-600 text-lg leading-relaxed max-w-md mb-5'>
              Welcome to Fashnology! We blend the latest fashion trends with modern technology to bring you a unique shopping experience. Thank you for being part of our journey!
            </p>
                <Title text1={'OUR'} text2={'Mission'}/>  
              <p className='text-gray-600 text-lg leading-relaxed max-w-md'>
                Our mission is to help you express your style with confidence, comfort, and innovation.
              Whether you're looking for timeless classics or the newest arrivals, our curated collection has something for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className='max-w-6xl mx-auto my-16'>
        <div className='text-left mb-8 flex items-center gap-3'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Card 1 */}
          <div className='bg-white border border-gray-200 rounded-xl p-6 text-left h-full flex flex-col items-start'>
            <span className='font-semibold text-gray-900 mb-2'>Quality Assurance:</span>
            <span className='text-gray-600 text-sm'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</span>
          </div>
          {/* Card 2 */}
          <div className='bg-white border border-gray-200 rounded-xl p-6 text-left h-full flex flex-col items-start'>
            <span className='font-semibold text-gray-900 mb-2'>Convenience:</span>
            <span className='text-gray-600 text-sm'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</span>
          </div>
          {/* Card 3 */}
          <div className='bg-white border border-gray-200 rounded-xl p-6 text-left h-full flex flex-col items-start'>
            <span className='font-semibold text-gray-900 mb-2'>Exceptional Customer Service:</span>
            <span className='text-gray-600 text-sm'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</span>
          </div>
        </div>
      </div>
      <Box/>
    </div>
  )
}

export default About