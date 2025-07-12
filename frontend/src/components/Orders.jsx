import React, { useContext, useState, useEffect } from 'react';
import Title from './Title';
import { Context } from '../Context';
import axios from 'axios';

const Orders = () => {
  const { token } = useContext(Context);
  const [orderdata, setOrderdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const getorderdata = async () => {
    try {
      if (!token) return;
      setLoading(true);
      // The backend expects userId in the POST body, not as a GET param
      const response = await axios.post(
        "https://backende-commerce-kappa.vercel.app/api/order/userorders",
        {}, // no userId needed
        { headers: { token } }
      );
      if (response.data.success) {
        console.log("Order response:", response.data);
        let allorders = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item, idx) => {
            allorders.push({
              ...item,
              status: order.status || "Ready To Ship",
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id || idx,
            });
          });
        });
        setOrderdata(allorders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getorderdata();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className='min-h-screen bg-gray-50 py-10'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <div className='space-y-6'>
          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading orders...</div>
          ) : orderdata.length === 0 ? (
            <div className="text-center text-gray-500 py-12">You have no orders yet.</div>
          ) : (
            orderdata.map(item => (
              <div key={item.orderId + '-' + item._id + '-' + item.size} className='grid grid-cols-1 sm:grid-cols-3 items-start sm:items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm'>
                <div className='flex items-center gap-4'>
                  <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className='w-20 h-20 object-cover rounded-lg flex-shrink-0'/>
                  <div className='flex-1 min-w-0'>
                    <div className='font-semibold text-gray-900'>{item.name}</div>
                    <div className='text-gray-700 text-sm mt-1'>
                      ${item.price} <span className='mx-2'>·</span> Quantity: {item.quantity} <span className='mx-2'>·</span> Size: {item.size}
                    </div>
                    <div className='text-gray-500 text-xs mt-1'>
                      Date: {new Date(item.date).toLocaleString()}
                    </div>
                    <div className='text-gray-500 text-xs mt-1'>
                      Payment: {item.payment ? "Paid" : "Not Paid"} ({item.paymentMethod})
                    </div>
                  </div>
                </div>
                {/* Status */}
                <div className={`m-auto flex items-center gap-2 text-sm font-medium ${
                  item.status === "Order placed" || item.status === "Ready To Ship"
                    ? "text-green-600"
                    : item.status === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                  <span className={`w-2 h-2 rounded-full inline-block ${
                    item.status === "Order placed" || item.status === "Ready To Ship"
                      ? "bg-green-500"
                      : item.status === "Cancelled"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}></span>
                  {item.status || "Ready To Ship"}
                </div>
                {/* Track Button */}
                <button className='px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition'>
                  Track Order
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;