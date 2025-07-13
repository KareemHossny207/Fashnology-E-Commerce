import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import { FaStripe, FaMoneyBillWave } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import Title from './Title';
import axios from "axios";
import { toast } from "react-toastify";

const paymentMethods = [
  { id: 'stripe', label: 'Stripe', icon: <FaStripe className='text-indigo-600 text-lg sm:text-xl' /> },
  { id: 'razorpay', label: 'Razorpay', icon: <SiRazorpay className='text-blue-700 text-lg sm:text-xl' /> },
  { id: 'cod', label: 'Cash on Delivery', icon: <FaMoneyBillWave className='text-gray-700 text-lg sm:text-xl' /> },
];

const Placeorder = () => {
  const { currency, delivery, getCartTotal, getCartItemsArray, navigate, token, setCartitems } = useContext(Context);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: ''
  });
  const [payment, setPayment] = useState('cod');
  const cartItems = getCartItemsArray();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = Number(delivery);
  const total = subtotal + shipping;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    // Validate address fields
    for (const key in form) {
      if (!form[key].trim()) {
        toast.error("Please fill in all delivery information fields.");
        return;
      }
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Build orderItems array from cartItems
    const orderItems = cartItems.map(item => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
      quantity: item.quantity,
    }));

    // Prepare order data
    const orderData = {
      address: form,
      items: orderItems,
      amount: getCartTotal(),
      paymentMethod: payment,
    };

    // Place order based on selected payment method
    if (payment === 'cod') {
      try {
        const response = await axios.post(
          "https://backende-commerce-kappa.vercel.app/api/order/place",
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          setCartitems({});
          try {
            await axios.post("https://backende-commerce-kappa.vercel.app/api/cart/removeall", {}, { headers: { token } });
          } catch (removeErr) {
            console.log('Backend cart clear error:', removeErr);
          }
          toast.success("Order placed successfully!");
          navigate("/Orders");
        } else {
          toast.error(response.data.message || "Order failed");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message || "Order failed");
        console.log('Order error:', error);
      }
    } else if (payment === 'stripe') {
      const responseStripe = await axios.post("https://backende-commerce-kappa.vercel.app/api/order/stripe",orderData,{headers:{token}})
      if (responseStripe.data.success) {
        const {session_url}=responseStripe.data
        window.location.replace(session_url)
      }else{
        console.log(responseStripe.data.message );
        toast.error(responseStripe.data.message || "Stripe order failed");
      }
    } else if(payment === 'razorpay'){
      toast.info("Razorpay Method will be available soon");
    }else{
      toast.error("please selesct a payment method");
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center'>Complete Your Order</h1>
            <p className='text-blue-100 text-center mt-2'>Fill in your delivery information and choose payment method</p>
          </div>

          <div className='p-6 sm:p-8 lg:p-12'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
              {/* Delivery Information */}
              <div className='space-y-6'>
                <div className='text-center lg:text-left'>
                  <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                
                <form className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
                      <input 
                        name='firstName' 
                        value={form.firstName} 
                        onChange={handleChange} 
                        placeholder='Enter first name' 
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
                      <input 
                        name='lastName' 
                        value={form.lastName} 
                        onChange={handleChange} 
                        placeholder='Enter last name' 
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                    <input 
                      name='email' 
                      value={form.email} 
                      onChange={handleChange} 
                      placeholder='Enter email address' 
                      className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Street Address</label>
                    <input 
                      name='street' 
                      value={form.street} 
                      onChange={handleChange} 
                      placeholder='Enter street address' 
                      className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                      <input 
                        name='city' 
                        value={form.city} 
                        onChange={handleChange} 
                        placeholder='Enter city' 
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                      <input 
                        name='state' 
                        value={form.state} 
                        onChange={handleChange} 
                        placeholder='Enter state' 
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Zip Code</label>
                      <input 
                        name='zipcode' 
                        value={form.zipcode} 
                        onChange={handleChange} 
                        placeholder='Enter zip code' 
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Country</label>
                      <input 
                        name='country' 
                        value={form.country} 
                        onChange={handleChange} 
                        placeholder='Enter country' 
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                    <input 
                      name='phone' 
                      value={form.phone} 
                      onChange={handleChange} 
                      placeholder='Enter phone number' 
                      className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm' 
                    />
                  </div>
                </form>
              </div>

              {/* Order Summary & Payment */}
              <div className='space-y-6'>
                <div className='text-center lg:text-left'>
                  <Title text1={'ORDER'} text2={'SUMMARY'} />
                </div>

                {/* Cart Items Preview */}
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='font-semibold text-gray-800 mb-3'>Items in Cart ({cartItems.length})</h3>
                  <div className='space-y-2 max-h-32 overflow-y-auto'>
                    {cartItems.map((item, index) => (
                      <div key={index} className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 truncate'>{item.name} (Qty: {item.quantity})</span>
                        <span className='font-medium'>{currency}{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className='bg-white border border-gray-200 rounded-lg p-4 space-y-3'>
                  <div className='flex justify-between text-gray-600'>
                    <span>Subtotal</span>
                    <span>{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-gray-600'>
                    <span>Shipping Fee</span>
                    <span>{currency}{shipping.toFixed(2)}</span>
                  </div>
                  <hr className='border-gray-200' />
                  <div className='flex justify-between text-lg font-bold text-gray-900'>
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className='space-y-4'>
                  <div className='text-center lg:text-left'>
                    <Title text1={'PAYMENT'} text2={'METHODS'} />
                  </div>
                  
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        type='button'
                        onClick={() => setPayment(method.id)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          payment === method.id 
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {method.icon}
                        <span className='hidden sm:inline'>{method.label}</span>
                        <span className='sm:hidden'>{method.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <button 
                  onClick={handleOrder} 
                  className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg'
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;