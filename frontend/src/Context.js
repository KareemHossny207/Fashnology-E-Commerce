import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Context = createContext();

const ContextProvider = (props) => {
  const currency = '$';
  const delivery = 10;
  const [search, setSearch] = useState('');
  const [showsearchbar, setShowsearchbar] = useState(false);
  const [cartitems, setCartitems] = useState({});
  const [allproducts, setAllproducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cartitems');
    if (savedCart) {
      try {
        setCartitems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('cartitems');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartitems', JSON.stringify(cartitems));
  }, [cartitems]);

  // Fetch all products from the backend
  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:5777/api/product/all');
      if (response.data && response.data.success) {
        setAllproducts(response.data.products);
      } else {
        toast.error(response.data?.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'An error occurred while fetching products');
    }
  };

  // Normalize backend cart data to frontend format
  const normalizeCart = (backendCart) => {
    const normalizedCart = {};
    Object.keys(backendCart || {}).forEach(itemId => {
      const sizes = backendCart[itemId];
      const product = allproducts.find(p => p._id === itemId);
      Object.keys(sizes).forEach(size => {
        const key = `${itemId}-${size}`;
        normalizedCart[key] = {
          _id: itemId,
          size,
          quantity: sizes[size],
          ...(product ? {
            name: product.name,
            price: product.price,
            image: product.image,
          } : {})
        };
      });
    });
    return normalizedCart;
  };

  // Sync local cart with backend when user logs in
  const syncCartWithBackend = async (localCart, token) => {
    if (!token || !localCart || Object.keys(localCart).length === 0) return;
    
    try {
      // Get current backend cart
      const response = await axios.post("http://localhost:5777/api/cart/get", {}, { headers: { token } });
      const backendCart = response.data?.success ? response.data.cartData : {};
      
      // Merge local cart with backend cart
      const mergedCart = { ...backendCart };
      
      Object.values(localCart).forEach(item => {
        const { _id, size, quantity } = item;
        if (!mergedCart[_id]) {
          mergedCart[_id] = {};
        }
        mergedCart[_id][size] = (mergedCart[_id][size] || 0) + quantity;
      });
      
      // Update backend with merged cart
      for (const [itemId, sizes] of Object.entries(mergedCart)) {
        for (const [size, quantity] of Object.entries(sizes)) {
          await axios.post("http://localhost:5777/api/cart/update", {
            itemId,
            size,
            quantity
          }, { headers: { token } });
        }
      }
      
      // Update local cart with normalized backend data
      const normalized = normalizeCart(mergedCart);
      setCartitems(normalized);
      
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
    }
  };

  // Add a product to the shopping cart
  const addToCart = (_id, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }
    const product = allproducts.find(item => item._id === _id);
    if (product) {
      const itemKey = `${_id}-${size}`;
      setCartitems(prev => ({
        ...prev,
        [itemKey]: {
          ...product,
          size,
          quantity: prev[itemKey] ? prev[itemKey].quantity + 1 : 1,
        },
      }));
      if (token) {
        axios.post("http://localhost:5777/api/cart/add", {
          itemId: _id,
          size: size
        }, {
          headers: { token }
        }).catch((error) => {
          toast.error(error.message);
        });
      }
      toast.success('Added to cart');
    } else {
      toast.error('Product not found');
    }
  };

  // Remove a specific product (with specific size) from the cart
  const removeFromCart = (_id, size) => {
    const itemKey = `${_id}-${size}`;
    setCartitems(prev => {
      const newCart = { ...prev };
      if (newCart[itemKey]) {
        delete newCart[itemKey];
        toast.info('Removed from cart');
      }
      return newCart;
    });
    if (token) {
      axios.post("http://localhost:5777/api/cart/removefromcart", {
        itemId: _id,
        size: size
      }, {
        headers: { token }
      }).catch((error) => {
        toast.error(error.message);
      });
    }
  };

  // Update the quantity of a specific product in the cart
  const updateQuantity = (_id, size, quantity) => {
    const itemKey = `${_id}-${size}`;
    if (quantity <= 0) {
      removeFromCart(_id, size);
    } else {
      setCartitems(prev => {
        if (!prev[itemKey]) return prev;
        return {
          ...prev,
          [itemKey]: {
            ...prev[itemKey],
            quantity,
          },
        };
      });
      if (token) {
        axios.post("http://localhost:5777/api/cart/update", {
          itemId: _id,
          size: size,
          quantity
        }, {
          headers: { token }
        }).catch((error) => {
          toast.error(error.message);
        });
      }
    }
  };

  // Clear all items from the shopping cart
  const clearCart = () => {
    setCartitems({});
    toast.info('Cart cleared');
    if (token) {
      axios.post("http://localhost:5777/api/cart/removeall", {}, {
        headers: { token }
      }).catch((error) => {
        toast.error(error.message);
      });
    }
  };

  // Convert cart object to array
  const getCartItemsArray = () => {
    return Object.values(cartitems);
  };

  // Calculate total number of items in cart (sum of all quantities)
  const getCartCount = () => {
    return Object.values(cartitems).reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Calculate total price of all items in cart (delivery is added only once if cart is not empty)
  const getCartTotal = () => {
    const items = Object.values(cartitems);
    const itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    return items.length > 0 ? itemsTotal + delivery : 0;
  };

  // Fetch and normalize cart from backend
  const getCartUser = async (token) => {
    if (!token) return;
    try {
      const response = await axios.post("http://localhost:5777/api/cart/get", {}, { headers: { token } });
      if (response.data && response.data.success && response.data.cartData) {
        const normalized = normalizeCart(response.data.cartData);
        setCartitems(normalized);
      } else {
        setCartitems({});
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error(error?.response?.data?.message || error.message || "Failed to fetch cart");
      setCartitems({});
    }
  };

  // On initial load, fetch products and cart if token exists
  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      setToken(storedToken);
    }
    if (storedToken && allproducts.length > 0) {
      // Always fetch backend cart first
      axios.post("http://localhost:5777/api/cart/get", {}, { headers: { token: storedToken } })
        .then(response => {
          const backendCart = response.data?.success ? response.data.cartData : {};
          if (Object.keys(backendCart).length === 0) {
            // Backend cart is empty, merge local cart if exists
            const localCart = localStorage.getItem('cartitems');
            if (localCart) {
              try {
                const parsedLocalCart = JSON.parse(localCart);
                if (Object.keys(parsedLocalCart).length > 0) {
                  syncCartWithBackend(parsedLocalCart, storedToken).then(() => {
                    localStorage.removeItem('cartitems');
                    getCartUser(storedToken); // Always use backend cart after merge
                  });
                  return;
                }
              } catch (error) {
                // If local cart is corrupted, just use backend cart
              }
            }
          }
          // In all other cases, just use backend cart
          getCartUser(storedToken);
        })
        .catch(() => {
          // fallback if error
          getCartUser(storedToken);
        });
    }
    // eslint-disable-next-line
  }, [token, allproducts]);

  // When user logs out, reset the sync flag
  useEffect(() => {
    if (!token) {
      localStorage.removeItem('hasSyncedCart');
    }
  }, [token]);

  const value = {
    allproducts,
    setAllproducts,
    currency,
    delivery,
    search,
    setSearch,
    showsearchbar,
    setShowsearchbar,
    cartitems,
    setCartitems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsArray,
    getCartCount,
    getCartTotal,
    navigate,
    setToken,
    token,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
