import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaBox, FaClipboardList, FaUsers, FaDollarSign } from 'react-icons/fa'

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch products count
      const productsResponse = await axios.get('https://backende-commerce-kappa.vercel.app/api/product/all')
      const totalProducts = productsResponse.data?.success ? productsResponse.data.products?.length || 0 : 0

      // Fetch orders count and recent orders
      const ordersResponse = await axios.get('https://backende-commerce-kappa.vercel.app/api/order/all')
      const orders = ordersResponse.data?.success ? ordersResponse.data.orders || [] : []
      const totalOrders = orders.length
      
      // Calculate total revenue
      const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0)

      // Get recent orders (last 5)
      const recentOrdersData = orders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)

      setStats({
        totalProducts,
        totalOrders,
        totalUsers: 0, // We'll add user count later if needed
        totalRevenue
      })
      setRecentOrders(recentOrdersData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-center h-40">
          <svg className="animate-spin h-8 w-8 text-gray-500 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span className="text-gray-500 text-lg">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-600">Welcome to your e-commerce admin panel</p>
        <hr className="border-t border-gray-300 mt-4" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
              <FaBox className="text-lg sm:text-xl" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600">
              <FaClipboardList className="text-lg sm:text-xl" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600">
              <FaUsers className="text-lg sm:text-xl" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaDollarSign className="text-lg sm:text-xl" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="p-4 sm:p-6">
          {recentOrders.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📦</div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-sm sm:text-base text-gray-500">Orders will appear here once customers start placing orders.</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {recentOrders.map((order) => (
                <div key={order._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">Order #{order._id?.substring(-8) || 'N/A'}</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">${order.amount || 0}</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status || "Order placed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-600">Backend Server</span>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Online
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-600">Database</span>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-600">Admin Panel</span>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 