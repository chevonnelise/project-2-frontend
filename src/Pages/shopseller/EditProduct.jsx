import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Fetch the product data from the backend using the productId
        const response = await axios.get(`https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/products`);
        setProduct(response.data);
        setProductName(response.data.productName);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setStockQuantity(response.data.stockQuantity);
        setImageURL(response.data.imageURL);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product data');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Send a PUT request to the backend to update the product
      const response = await axios.put(`https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/products`, {
        productName,
        price,
        description,
        stockQuantity,
        imageURL
      });
      console.log(response.data);
      alert('Product updated successfully');
    } catch (error) {
      setError(error.response.data.error || 'An error occurred while updating the product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
