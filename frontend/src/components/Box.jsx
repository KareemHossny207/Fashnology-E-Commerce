import React from 'react'

const Box = () => {
  const submithandler = (e) => {
    e.preventDefault();
  } 

  return (
    <section className='py-12'>
      <div className='max-w-xl mx-auto text-center'>
        <h2 className='text-xl sm:text-2xl font-semibold mb-4 text-gray-800'>
          Subscribe now & get 20% off
        </h2>
        <p className='text-gray-400 text-sm mb-6'>
          Dom't miss The Chance and get your offer Now
        </p>
        <form onSubmit={submithandler} className='border border-gray-300 max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 w-full'>
          <input
            className='w-full sm:flex-1  px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 transition text-sm rounded-none rounded-l-md sm:rounded-l-md sm:rounded-r-none bg-white'
            type='email'
            placeholder='Enter your email'
          />
          <button
            className='w-full sm:w-1/3 bg-gray-800 text-white uppercase font-semibold px-6 py-2 text-sm transition hover:bg-gray-900'
            type='submit'
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default Box