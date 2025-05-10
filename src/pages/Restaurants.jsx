import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/restaurants");
        setRestaurants(res.data);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Explore Restaurants</h2>
      <Row>
        {restaurants.map((res) => (
          <Col md={6} lg={4} key={res._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={res.image} />
              <Card.Body>
                <Card.Title>{res.name}</Card.Title>
                <Card.Text>{res.cuisine}</Card.Text>
                <Link to={`/restaurant/${res._id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Restaurants;

  






