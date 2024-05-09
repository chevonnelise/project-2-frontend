import React, { useContext } from 'react';
import CartItem from './CartItem';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ products }) => { // Receive the products array as a prop

    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    return (
        <div className="cart">
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className="cartItems">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem data={product} key={product.id} />; // Pass each product as props to the CartItem component
                    }
                })}
            </div>
            {totalAmount > 0 ? (
            <div className="checkout">
                <p>Subtotal: ${totalAmount}</p>
                <button onClick={()=>navigate("/")}>Continue Shopping</button>
                <button>Checkout</button>
            </div>
             ) : (
                <h1>Your Cart is Empty </h1>
            )}
        </div>
    );
}

export default Cart;
