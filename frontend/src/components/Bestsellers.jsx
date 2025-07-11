import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import Title from './Title';
import Product from './Product';

const Bestsellers = () => {
    const { allproducts } = useContext(Context);
    const [bestseller, setBestseller] = useState([]);

    useEffect(() => {
        // Filter products that are marked as bestseller and take the first 5
        const bestproducts = allproducts.filter((item) => item.bestseller);
        setBestseller(bestproducts.slice(0, 5));
    }, [allproducts]);

    return (
        <section className='py-16 bg-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <Title text1={'BEST'} text2={'SELLERS'} />
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-6 leading-relaxed">
                        Discover the Best Sellers in men's and women's fashion—shop trendy styles and fresh looks for every season!
                    </p>
                </div>

                {/* Products Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
                    {bestseller.map((item) => (
                        <Product
                            key={item._id || item.id}
                            id={item._id || item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Bestsellers