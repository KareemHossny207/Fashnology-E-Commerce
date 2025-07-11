import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../Context';
import { FaStar } from "react-icons/fa";
import Related from './Related';

const Productdetails = () => {
    const { id } = useParams();
    const { allproducts, currency, addToCart } = useContext(Context);
    const [productdata, setProductdata] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    useEffect(() => {
        if (allproducts && allproducts.length > 0) {
            const found = allproducts.find(item => String(item._id) === String(id));
            if (found) {
                setProductdata(found);
                setImage(found.image && found.image.length > 0 ? found.image[0] : '');
            } else {
                setProductdata(null);
                setImage('');
            }
        }
    }, [id, allproducts]);

    if (!productdata) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
            </div>
        );
    }

    // Fix: Use _id for addToCart, and handle missing images gracefully
    const handleAddToCart = () => {
        // If sizes are available, require a size to be selected
        if (productdata.sizes && Array.isArray(productdata.sizes) && productdata.sizes.length > 0 && !size) {
            alert('Please select a size before adding to cart.');
            return;
        }
        addToCart(productdata._id, size);
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-8'>
                        {/* Product Images */}
                        <div className='space-y-4'>
                            {/* Main Image */}
                            <div className='aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center'>
                                {image ? (
                                <img
                                    src={image}
                                    alt={productdata.name}
                                    className='w-full h-full object-cover'
                                />
                                ) : (
                                    <span className="text-gray-400">No Image</span>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            {productdata.image && productdata.image.length > 1 && (
                                <div className='grid grid-cols-4 gap-2'>
                                    {productdata.image.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setImage(img)}
                                            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                                img === image ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                                            }`}
                                            type="button"
                                        >
                                            <img
                                                src={img}
                                                alt={`${productdata.name} ${idx + 1}`}
                                                className='w-full h-full object-cover'
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className='space-y-6'>
                            <div>
                                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>{productdata.name}</h1>
                                <p className='text-gray-600 mb-4'>{productdata.description}</p>

                                {/* Rating */}
                                <div className='flex items-center gap-2 mb-4'>
                                    <div className='flex items-center gap-1'>
                                        {[...Array(5)].map((_, idx) => (
                                            <FaStar key={idx} className='text-yellow-400 text-sm' />
                                        ))}
                                    </div>
                                    <span className='text-sm text-gray-600'>(4.5 out of 5)</span>
                                </div>

                                {/* Price */}
                                <p className='text-3xl font-bold text-gray-900 mb-6'>{currency}{productdata.price}</p>
                            </div>

                            {/* Size Selection */}
                            {productdata.sizes && Array.isArray(productdata.sizes) && productdata.sizes.length > 0 && (
                                <div className='space-y-3'>
                                    <p className='font-medium text-gray-900'>Select Size</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {productdata.sizes.map((item, idx) => (
                                            <button
                                                onClick={() => setSize(item)}
                                                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                                                    item === size
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                                }`}
                                                key={idx}
                                                type="button"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                type="button"
                                disabled={
                                    productdata.sizes &&
                                    Array.isArray(productdata.sizes) &&
                                    productdata.sizes.length > 0 &&
                                    !size
                                }
                                style={
                                    productdata.sizes &&
                                    Array.isArray(productdata.sizes) &&
                                    productdata.sizes.length > 0 &&
                                    !size
                                        ? { opacity: 0.6, cursor: 'not-allowed' }
                                        : {}
                                }
                            >
                                ADD TO CART
                            </button>

                            {/* Product Features */}
                            <div className='border-t border-gray-100 pt-6'>
                                <h3 className='font-semibold text-gray-900 mb-4'>Product Features</h3>
                                <ul className='space-y-2 text-sm text-gray-600'>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                        Free shipping on orders over $50
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                        30-day return policy
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                        Secure payment processing
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className='mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                        <div className='flex border-b border-gray-100'>
                            <button className='flex-1 px-6 py-4 text-sm font-medium text-blue-500 border-b-2 border-blue-500 bg-blue-50' type="button">
                                Description
                            </button>
                        </div>
                        <div className='p-6'>
                            <p className='text-gray-600 leading-relaxed'>{productdata.description}</p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {productdata.category && productdata.subcategory && (
                    <Related category={productdata.category} subcategory={productdata.subcategory} />
                )}
            </div>
        </div>
    );
};

export default Productdetails