import React, { useContext } from 'react'
import { Context } from '../Context'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Title from './Title'

const Card = () => {
  const { 
    currency, 
    delivery,
    removeFromCart, 
    updateQuantity, 
    getCartItemsArray, 
    getCartTotal, 
    clearCart
  } = useContext(Context);

  const navigate = useNavigate();

  const cartItemsArray = getCartItemsArray ? getCartItemsArray() : [];
  const cartTotal = getCartTotal ? getCartTotal() : 0;

  if (!Array.isArray(cartItemsArray) || cartItemsArray.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='text-center'>
            <div className='text-gray-400 text-6xl mb-6'>🛒</div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>Your cart is empty</h1>
            <p className='text-gray-600 mb-8'>Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/Collection" 
              className='inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Cart Items */}
          <div className='flex-1'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
              <div className='flex justify-between items-center mb-6'>
                <Title text1={'YOUR'} text2={'CART'} />
                <button 
                  onClick={clearCart}
                  className='text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200'
                  disabled={cartItemsArray.length === 0}
                >
                  Clear All
                </button>
              </div>

              <div className='space-y-4'>
                {cartItemsArray.map((item) => (
                  <div key={`${item._id}-${item.size}`} className='flex gap-4 p-4 border border-gray-100 rounded-xl'>
                    {/* Product Image */}
                    <div className='w-20 h-20 flex-shrink-0'>
                      <img 
                        src={item.image && item.image[0] ? item.image[0] : ''}
                        alt={item.name}
                        className='w-full h-full object-cover rounded-lg'
                        onError={e => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className='flex-1'>
                      <h3 className='text-sm sm:text-base font-semibold text-gray-900 mb-2'>{item.name}</h3>
                      <p className='mb-2 px-2 py-1 rounded-md border border-gray-200 bg-gray-50 font-medium text-sm text-gray-700 w-fit'>{item.size}</p>
                      <p className='font-bold text-gray-900'>{currency}{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className='flex items-center gap-3'>
                      <button 
                        onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                        className='w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus className='text-gray-600 text-xs' />
                      </button>
                      <span className='w-8 text-center font-medium'>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className='w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                        aria-label="Increase quantity"
                      >
                        <FaPlus className='text-gray-600 text-xs' />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item._id, item.size)}
                      className='text-gray-600 hover:text-red-600 transition-colors duration-200'
                      aria-label="Remove item"
                    >
                      <FaTrash className='text-lg' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:w-80'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>
              
              <div className='space-y-4 mb-6'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal ({cartItemsArray.reduce((acc, item) => acc + (item.quantity || 0), 0)} items)</span>
                  <span>{currency}{cartTotal}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping</span>
                  <span>{currency}{delivery}</span>
                </div>
                <hr className='border-gray-200' />
                <div className='flex justify-between text-lg font-bold text-gray-900'>
                  <span>Total</span>
                  <span>{currency}{Number(cartTotal) + Number(delivery)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/Placeorder')}
                className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                disabled={cartItemsArray.length === 0}
              >
                Proceed to Checkout
              </button>

              <div className='mt-4 text-center'>
                <Link 
                  to="/Collection" 
                  className='text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-200'
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card