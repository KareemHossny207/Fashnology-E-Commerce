import React from 'react'
import Title from './Title'
import Box from './Box'
const Contact = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='text-center'>
      <Title text1={'CONTACT'} text2={'US'}/>
      </div>
<div className=' flex items-center justify-center mb-16'>
      <div className='max-w-3xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-sm overflow-hidden'>
        {/* Image Section */}
        <div className='w-full md:w-1/2'>
          <img
            src='/images/gallery1.png'
            alt='Our Store'
            className='w-full h-80 md:h-full object-cover'
          />
        </div>
        {/* Info Section */}
        <div className='w-full md:w-1/2 flex flex-col justify-center p-8'>
          <div className='mb-8'>
            <h2 className='text-lg font-semibold mb-2'>Our Store</h2>
            <p className='text-gray-600 mb-1'>54709 Willms Station<br/>Suite 350, Washington, USA</p>
            <p className='text-gray-600 mb-1'>Tel: (415) 555-0132</p>
            <p className='text-gray-600 mb-1'>Email: admin@Fashnology.com</p>
          </div>
          <div className='mb-8'>
            <h2 className='text-lg font-semibold mb-2'>Careers at Fashnology</h2>
            <p className='text-gray-600 mb-4'>Learn more about our teams and job openings.</p>
            <button className='border border-gray-700 px-6 py-2 rounded-md text-gray-800 font-medium hover:bg-gray-100 transition'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
    <Box/>
    </div>
    
  )
}

export default Contact