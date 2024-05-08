import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
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

  const handleCart = async (productId) => {
    setLoading(true);

    try {
      const response = await axios.post(`https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/cart/${productId}`);
      console.log(response.data);
      alert('Added to cart');
    } catch (error) {
      setError(error.response.data.error || 'An error occurred when adding to cart');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', minHeight: '100vh', padding: '50px'}}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Row xs={1} md={3} className="g-4">
        {products.map((product) => (
          <Card key={product.id} style={{ width: '18rem', margin: '10px', padding: '20px'}}>
            <Card.Img variant="top" src={product.image_url} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.cost}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>{product.tags.map((tag, index) => (
                <span key={index} style={{ marginRight: '5px', color: 'white' }}><Badge bg="success">{tag.name}{index !== product.tags.length - 1}</Badge></span>
              ))}</Card.Text>
              <Button className="btn btn-outline-dark" onClick={() => handleCart(product.id)}>Add to cart</Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default Shop;
