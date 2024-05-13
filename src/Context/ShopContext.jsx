import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const findProductById = (productId) => {
        const foundProduct = products.filter((product) => {
            return product.id === productId
        })
        return foundProduct;
    }

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
        let cart = []
        for (let i = 0; i < products.length; i++) {
            cart[products[i]._id] = 0;
        }
        return cart;
    }

    
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                
                // let itemInfo = products.find((product) => product._id === item);
                let itemInfo = findProductById(item);
                console.log(item)
                console.log(itemInfo)
                totalAmount += cartItems[item] * itemInfo.cost
            }
        }
        return totalAmount;
    }

    const addToCart = (productId) => {
        if (!cartItems[productId]){
            setCartItems(prevCart => ({ ...prevCart, [findProductById(productId).id]: 1 }));
        } else {
            setCartItems(prevCart => ({ ...prevCart, [productId]: prevCart[productId] + 1 }));
        } 
        console.log(cartItems);
    }

    const removeFromCart = (productId) => {
        setCartItems(prevCart => ({ ...prevCart, [productId]: prevCart[productId] - 1 }));
    }

    const updateCartItemCount = (newQuantity, productId) => {
        if (newQuantity < 0) return;
        setCartItems(prevCart => ({ ...prevCart, [productId]: newQuantity }));
    }

    const contextValue = {
        products,
        loading,
        error,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
