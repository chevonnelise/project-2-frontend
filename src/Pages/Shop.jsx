import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetch('https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/products')
        .then(res =>{
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          setProducts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
      <div className="card-container">
        <Row xs={1} md={2} className="g-4">
          {Object.keys(products).map((key, i) => (
            <Col key={i}>
              <Card>
                <Card.Img variant="top" src={products[key].image_url} />
                <Card.Body>
                  <Card.Title>{products[key].name}</Card.Title>
                  <Card.Text>{products[key].cost}</Card.Text>
                  <Card.Text>{products[key].description}</Card.Text>
                  <Card.Text>{products[key].tags}</Card.Text>
                  <Button variant="dark">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
};

export default Shop;
