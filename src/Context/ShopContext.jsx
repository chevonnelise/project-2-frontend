import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

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

    
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0.0);

    const getCartItemId = (productId) => {
        const cartItem = cartItems.find((i) => {
            return i.product.id === productId;
        })
        return cartItem.id;
    }

    const getCartItemQty = (productId) => {
        const cartItem = cartItems.find((i) => {
            return i.product.id === productId;
        })
        return cartItem.quantity;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (UserContext.user.id) {
                    const getCartItems = await axios.get("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/cart/${UserContext.user.id}");
                    setCartItems(getCartItems.data.cartItems);
                } else {
                    setCartItems([]);
                }
            } catch (err) {
                console.log(err);
                if (err.response.status === 498) UserContext.refresh();
            }
        };
        fetchData();
    }, [UserContext.user.id, UserContext]);

    const getCartItemCount = (productId) => {
        if (productId in cartItems) {
            return cartItems[productId]
        }
        return 0;
    }

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

    const addToCart = async (productId) => {
        try {
            const response = await axios.post("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/cart/", {
                userId: UserContext.user.id,
                productId: productId,
                quantity:1,
            });

            if (response.status === 201) {
                setCartItems([...cartItems, response.data.message]);
            }
        } catch (err) {
            console.log(err);
            if (err.response.status === 498) UserContext.refresh();
        }
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
        getCartItemCount,
        getTotalCartAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
