import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState({})

  const getAllOrders = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        "https://backende-commerce-kappa.vercel.app/api/order/all",{},)
      if (response.data && response.data.success && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders)
      } else {
        setOrders([])
        setLoading(true)
        toast.error(response.data?.message || "Failed to fetch orders")
      }
    } catch (error) {
      setOrders([])
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching orders"
      )
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingStatus(prev => ({ ...prev, [orderId]: true }))
    try {
      const response = await axios.put(
        "https://backende-commerce-kappa.vercel.app/api/order/status",
        {
          orderId,
          status: newStatus
        },
        {
          headers: { token }
        }
      )
      
      if (response.data && response.data.success) {
        toast.success("Order status updated successfully!")
        setOrders(prev => prev.map(order => 
          order._id === orderId 
            ? { ...order, status: newStatus }
            : order
        ))
      } else {
        toast.error(response.data?.message || "Failed to update order status")
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Error updating order status"
      )
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [orderId]: false }))
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  const statusOptions = [
    "Order placed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned"
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Order placed":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Returned":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">All Orders</h2>
        <hr className="border-t border-gray-300" />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <svg className="animate-spin h-8 w-8 text-gray-500 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span className="text-gray-500 text-lg">Loading orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40">
          <svg className="h-12 w-12 text-gray-300 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1m16-4V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6" />
          </svg>
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <div
              key={order._id || Math.random()}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">Order ID:</span>
                <span className="text-xs font-mono text-gray-700">{order._id || "-"}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">User ID:</span>
                <span className="text-xs font-mono text-gray-700">{order.userId || "-"}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">Amount:</span>
                <span className="text-base font-bold text-blue-700">
                  ${order.amount != null ? order.amount : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">Date:</span>
                <span className="text-xs text-gray-700">
                  {order.date ? new Date(order.date).toLocaleString() : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">Payment:</span>
                <span className={order.payment ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
                  {order.payment ? "Paid" : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">Payment Method:</span>
                <span className="text-xs text-gray-700">{order.paymentMethod || "-"}</span>
              </div>
              
              {/* Status Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400">Current Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status || "Order placed"}
                  </span>
                </div>
                
                {/* Status Update Controls */}
                <div className="flex items-center gap-2">
                  <select
                    className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={order.status || "Order placed"}
                    onChange={(e) => {
                      const newStatus = e.target.value
                      if (newStatus !== order.status) {
                        updateOrderStatus(order._id, newStatus)
                      }
                    }}
                    disabled={updatingStatus[order._id]}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  
                  {updatingStatus[order._id] && (
                    <div className="flex items-center">
                      <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <span className="text-xs font-semibold text-gray-400">Address:</span>
                <div className="text-xs text-gray-700 mt-1">
                  {order.address
                    ? typeof order.address === "string"
                      ? order.address
                      : Object.values(order.address).join(", ")
                    : "-"}
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400">Items:</span>
                <ul className="list-disc pl-5 mt-1">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <li key={item._id || idx} className="text-sm text-gray-800">
                        <span className="font-medium">{item.name ? item.name : "Unknown"}</span>
                        <span className="ml-2 text-gray-500">quantity: {item.quantity != null ? item.quantity : "-"}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400">No items</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders