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
        <Spinner animation="border" variant="danger" />
        <h4 className="mt-2 text-danger">Loading Restaurants...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <h4 className="text-danger">{error}</h4>
      </Container>
    );
  }

  return (
    <div
      
    >
      <Container>
        <h2 className="mb-5 text-center text-danger fw-bold">Explore Restaurants</h2>
        <Row>
          {restaurants.length > 0 ? (
            restaurants.map((res) => (
              <Col md={6} lg={4} key={res._id} className="mb-4">
                <Card className="shadow-sm rounded border-0">
                  <Card.Img
                    variant="top"
                    src="https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">{res.name}</Card.Title>
                    <Card.Text className="text-muted">{res.cuisine}</Card.Text>
                    <Link to={`/restaurant/${res._id}`}>
                      <Button variant="danger" className="w-100">
                        View Menu
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No restaurants found.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Restaurants;
