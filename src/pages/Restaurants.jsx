import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);  // Ensure this is an empty array by default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("/api/restaurants");  // Fetch data from backend
        if (Array.isArray(res.data)) {  // Check if the response data is an array
          setRestaurants(res.data);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch restaurants");
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" variant="primary" />
        <h4>Loading Restaurants...</h4>
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
        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          restaurants.map((res) => (
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
          ))
        ) : (
          <p>No restaurants found.</p>  // Handle case when the restaurants array is empty
        )}
      </Row>
    </Container>
  );
};

export default Restaurants;



