import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products from API when the component mounts
    useEffect(() => {
        setLoading(true);
        axios.get('https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/products')
            .then(res => {
                setProducts(res.data.product);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const getDefaultCart = () => {
        let cart = {}
        for ( let i = 1; i < products.length + 1; i++) {
          cart[i] = 0
        }
        return cart;
    }

    const [cartItems, setCartItems] = useState(getDefaultCart());

    const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price
      }
    }
    return totalAmount;
  }

    const addToCart = (itemId) => {
        setCartItems(prevCart => ({ ...prevCart, [itemId]: prevCart[itemId] + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems(prevCart => ({ ...prevCart, [itemId]: prevCart[itemId] - 1 }));
    }

    const updateCartItemCount = (newQuantity, itemId) => {
        setCartItems(prevCart => ({ ...prevCart, [itemId]: newQuantity }));
    }

    const contextValue = { products, loading, error, cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
