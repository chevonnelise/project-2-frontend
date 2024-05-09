import React, { useEffect, useState } from 'react';
import { Product } from './Product';
import Cart from '../cart/Cart'; // Import the Cart component
import axios from 'axios';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="shop">
      <div className="shop-title">
        <h1>Browse Products</h1>
      </div>
      <div className="products">
        <Product />
        <Cart products={products} /> {/* Pass the products array to the Cart component */}
      </div>
    </div>
  )
}

export default Shop;