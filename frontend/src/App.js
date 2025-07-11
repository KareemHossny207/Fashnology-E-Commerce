import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Contact from './components/Contact';
import Orders from './components/Orders';
import Placeorder from './components/Placeorder';
import Product from './components/Product';
import Login from './components/Login';
import Verify from './components/Verify';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
import Collection from './components/Collection';
import Productdetails from './components/Productdetails';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <ToastContainer/>
        <Navbar />
        <Searchbar/>
        <main className='px-4 sm:px-6 lg:px-8'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/product/:id" element={<Productdetails />} />
            <Route path="/Card" element={<Card />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Placeorder" element={<Placeorder />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Collection" element={<Collection />} />
            <Route path="/Verify" element={<Verify />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default App