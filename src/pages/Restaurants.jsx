import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("/api/restaurants");  
        if (Array.isArray(res.data)) {
          setRestaurants(res.data);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      } catch (err) {
        setError("Currently No Restaurants to Explore");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-2">Loading Restaurants...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <h4>{error}</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Explore Restaurants</h2>
      <Row>
        {restaurants.length > 0 ? (
          restaurants.map((res) => (
            <Col md={6} lg={4} key={res._id} className="mb-4">
              <Card>
            
                <Card.Body>
                  <Card.Title>{res.name}</Card.Title>
                  <Card.Text>{res.cuisine}</Card.Text>
                  <Link to={`/restaurant/${res._id}`}>
                    <Button variant="danger">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Restaurants;
