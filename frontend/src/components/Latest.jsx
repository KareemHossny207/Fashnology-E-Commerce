import React from 'react'
import { useContext ,useState ,useEffect } from 'react'
import Title from './Title'
import {Context} from '../Context';
import Product from './Product';

const Latest = () => {
    const{allproducts}=useContext(Context);
    const [latestproducts , setLatestproducts]=useState([]);
    
    useEffect(()=>{
        setLatestproducts(allproducts.slice(0,10));
    },[allproducts]);
    
    return (
        <section className='py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <Title text1={'LATEST'} text2={'ARRIVALS'} />
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-6 leading-relaxed">
                        Discover the latest arrivals in men's and women's fashion—shop trendy styles and fresh looks for every season!
                    </p>
                </div>
                
                {/* Products Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                    {latestproducts.map((item)=>(
                        <Product key={item._id||item.id} id={item._id||item.id} image={item.image} name={item.name} price={item.price} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Latest