import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import { FaStripe, FaMoneyBillWave } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import Title from './Title';
import axios from "axios";
import { toast } from "react-toastify";

const paymentMethods = [
  { id: 'stripe', label: 'stripe', icon: <FaStripe className='text-indigo-600 text-xl' /> },
  { id: 'razorpay', label: 'Razorpay', icon: <SiRazorpay className='text-blue-700 text-xl' /> },
  { id: 'cod', label: 'CASH ON DELIVERY', icon: <FaMoneyBillWave className='text-gray-700 text-xl' /> },
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
          "http://localhost:5777/api/order/place",
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          setCartitems({});
          try {
            await axios.post("http://localhost:5777/api/cart/removeall", {}, { headers: { token } });
          } catch (removeErr) {
            // Optionally show error, but don't block navigation
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
      const responseStripe = await axios.post("http://localhost:5777/api/order/stripe",orderData,{headers:{token}})
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
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-10'>
      <div className='w-full max-w-5xl bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row gap-12'>
        {/* Delivery Info */}
        <div className='flex-1'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          <form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input name='firstName' value={form.firstName} onChange={handleChange} placeholder='First name' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' />
            <input name='lastName' value={form.lastName} onChange={handleChange} placeholder='Last name' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' />
            <input name='email' value={form.email} onChange={handleChange} placeholder='Email address' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none sm:col-span-2' />
            <input name='street' value={form.street} onChange={handleChange} placeholder='Street' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none sm:col-span-2' />
            <input name='city' value={form.city} onChange={handleChange} placeholder='City' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' />
            <input name='state' value={form.state} onChange={handleChange} placeholder='State' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' />
            <input name='zipcode' value={form.zipcode} onChange={handleChange} placeholder='Zipcode' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' />
            <input name='country' value={form.country} onChange={handleChange} placeholder='Country' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' />
            <input name='phone' value={form.phone} onChange={handleChange} placeholder='Phone' className='border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none sm:col-span-2' />
          </form>
        </div>
        {/* Cart Totals & Payment */}
        <div className='flex-1'>
          <Title text1={'CART'} text2={'TOTAL'} />
          <div className='mb-6'>
            <div className='flex justify-between py-2 text-gray-700'>
              <span>Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between py-2 text-gray-700'>
              <span>Shipping Fee</span>
              <span>{currency}{shipping.toFixed(2)}</span>
            </div>
            <hr className='my-2' />
            <div className='flex justify-between py-2 font-bold text-gray-900'>
              <span>Total</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
          </div>
          <Title text1={'PAYMENT'} text2={'METHODS'} />

          <div className='flex gap-2 mb-6'>
            {paymentMethods.map(method => (
              <button
                key={method.id}
                type='button'
                onClick={() => setPayment(method.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-semibold transition-all duration-150 ${
                  payment === method.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                {method.icon}
                {method.label}
              </button>
            ))}
          </div>
          <button onClick={handleOrder} className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2'>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;