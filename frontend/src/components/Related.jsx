import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import Title from './Title';
import Product from './Product';

const Related = ({category,subcategory}) => {
    const {allproducts}=useContext(Context);
    const [relatedproduct,setRelatedproduc]=useState([]);

    useEffect(()=>{
        if (allproducts.length>0) {
            let productscopy=allproducts.slice()
            productscopy = productscopy.filter((item)=>category===item.category)
            productscopy = productscopy.filter((item)=>subcategory===item.subcategory)

            setRelatedproduc(productscopy.slice(0,5))
        }
    },[allproducts])
  return (
    <div className='my-24'>
        <div className='text-center items-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                relatedproduct.map((item,idx)=>(
                    <Product key={idx} image={item.image} name={item.name} price={item.price} id={item.id}/>

                ))
            }
        </div>
    </div>
  )
}

export default Related