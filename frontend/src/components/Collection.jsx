import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import Title from './Title';
import Product from './Product';
import { FaFilter, FaSort } from 'react-icons/fa';

const Collection = () => {
  // Get the data from context 
  const { search ,showsearchbar ,allproducts} = useContext(Context);

  // State for the filtered list of products to display
  const [filterproducts, setFilterproducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sorttype,setSorttype]=useState('relevant');
  const [showFilters, setShowFilters] = useState(false);

  // Toggle category selection when a checkbox is clicked
  const togglecat = (e) => {
    // If already selected, remove from array; otherwise, add it
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))// Remove the selected value from the category array if it already exists (unchecking a checkbox)
    } else {
      setCategory(prev => [...prev, e.target.value])// Add the selected value to the category array (checking a checkbox)
    }
  }

  // Toggle subcategory selection when a checkbox is clicked
  const togglesubcat = (e) => {
    if (subcategory.includes(e.target.value)) {
      //`e.target.value` represents the value of item that toggled.
      //`prev` The previous state of the array before the update
      setSubcategory(prev => prev.filter(item => item !== e.target.value)) // Remove the selected value from the subcategory array if it already exists (unchecking a checkbox)
    } else {
      setSubcategory(prev => [...prev, e.target.value])  // Add the selected value to the subcategory array (checking a checkbox)

    }
  }

  // Apply filters to the shop data based on selected categories/subcategories
  const applyfilter = () => {
    let shopcopy = allproducts.slice(); // Make a copy of the products array

    if (showsearchbar && search) {
      shopcopy = shopcopy.filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
    }
    // Filter by category when(checkbox category) selected
    if (category.length > 0) {
      shopcopy = shopcopy.filter(item => category.includes(item.category)) //get each item category include category i selected
    }

    // Filter by subcategory when(checkbox subcategory) selected
    if (subcategory.length > 0) {
      shopcopy = shopcopy.filter(item => subcategory.includes(item.subcategory)) //get each item subcategory include subcategory i selected
    }

    setFilterproducts(shopcopy); 
  }

// The sort method compares two products (a and b).

// If a < b , a comes before b.
// If a > b , b comes before a.
const sortedproduct =()=> {
  let fpcopy = filterproducts.slice();
switch (sorttype) {
  case 'low-hight':
    setFilterproducts(fpcopy.sort((a,b)=>(a.price - b.price)));
    break;

  case 'hight-low':
    setFilterproducts(fpcopy.sort((a,b)=>(b.price - a.price)));
    
    break;

  default:
    applyfilter();
    break;
}

}

  // On initial render, show all products
  useEffect(() => {
    setFilterproducts(allproducts);
  }, []);

  // Whenever category or subcategory changes, apply the filter (when the checkbox checked)
  useEffect(() => {
    applyfilter();                   //اللي عايزو يحصل
  }, [category, subcategory ,search ,showsearchbar]);      //اللي علي حسبو بيحصل

    useEffect(() => {
    sortedproduct();               
  }, [sorttype]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
                  <div className='mb-8'>
            <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
              <div className='flex-1'></div>
              <Title text1={'ALL'} text2={'COLLECTION'} className='text-center'/>

              {/* Desktop sort dropdown */}
              <div className='hidden sm:flex items-center gap-2 flex-1 justify-end'>
                <FaSort className='text-gray-600' />
                <select 
                  onChange={(e)=>setSorttype(e.target.value)} 
                  className='px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value="relevant">Sort by: Relevant</option>
                  <option value="low-hight">Price: Low to High</option>
                  <option value="hight-low">Price: High to Low</option>
                </select>
          </div>
        </div>

          {/* Mobile Filter Toggle */}
          <div className='flex items-center gap-4 sm:hidden mb-4'>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'
            >
              <FaFilter className='text-blue-500' />
              Filters
            </button>
            
            <select 
              onChange={(e)=>setSorttype(e.target.value)} 
              className='px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-hight">Price: Low to High</option>
              <option value="hight-low">Price: High to Low</option>
            </select>
          </div>
          
          {/* Results count */}
          <p className='text-gray-600 text-sm'>
            Showing {filterproducts.length} of {allproducts.length} products
          </p>
        </div>

        <div className='flex gap-8'>
          {/* Filter Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block w-64 flex-shrink-0`}>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24'>
              <h3 className='font-semibold text-lg text-gray-900 mb-6'>Filters</h3>
              
              {/* Category Filter */}
              <div className='mb-8'>
                <h4 className='font-medium text-gray-900 mb-4'>Category</h4>
                <div className='space-y-3'>
                  {[...new Set(allproducts.map(item => item.category))].map((cat) => (
                    <label key={cat} className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
                        onChange={togglecat}
                        className='w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500'
                      />
                      <span className='text-sm text-gray-700'>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategory Filter */}
              <div className='mb-8'>
                <h4 className='font-medium text-gray-900 mb-4'>Subcategory</h4>
                <div className='space-y-3'>
                  {[...new Set(allproducts.map(item => item.subcategory))].map((subcat) => (
                    <label key={subcat} className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type="checkbox"
                        value={subcat}
                        checked={subcategory.includes(subcat)}
                        onChange={togglesubcat}
                        className='w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500'
                      />
                      <span className='text-sm text-gray-700'>{subcat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(category.length > 0 || subcategory.length > 0) && (
                <button
                  onClick={() => {
                    setCategory([]);
                    setSubcategory([]);
                  }}
                  className='w-full px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className='flex-1'>
            {filterproducts.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6'>
                {filterproducts.map((item, idx) => (
                  <Product key={item._id} id={item._id} name={item.name} image={item.image} price={item.price}/>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <div className='text-gray-400 text-6xl mb-4'>🔍</div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>No products found</h3>
                <p className='text-gray-600'>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection