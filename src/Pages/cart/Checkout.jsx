import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';

const Checkout = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const totalAmount = getTotalCartAmount();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Assuming you have an endpoint to create an order with cartItems data
      const response = await axios.post('https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/orders', { cartItems });
      console.log(response.data);
      alert('Order placed successfully');
      // Optionally, you can clear the cart after placing the order
      // clearCart();
    } catch (error) {
      setError(error.response.data.error || 'An error occurred while placing the order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <h2>Order Summary</h2>
          <ul>
            {Object.entries(cartItems).map(([productId, quantity]) => (
              <li key={productId}>
                Product ID: {productId}, Quantity: {quantity}
              </li>
            ))}
            <li>
              Subtotal: ${totalAmount}
            </li>
          </ul>
          <button onClick={handleCheckout} disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
          {error && <p>Error: {error}</p>}
        </div>
      )}
    </div>
  );
};

export default Checkout;
