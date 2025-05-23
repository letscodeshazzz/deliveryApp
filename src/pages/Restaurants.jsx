import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// Sample restaurant images
const restaurantImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
];

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("/api/restaurants");
        if (Array.isArray(res.data)) {
          const restaurantsWithImages = res.data.map((restaurant, index) => ({
            ...restaurant,
            image: restaurantImages[index % restaurantImages.length]
          }));
          setRestaurants(restaurantsWithImages);
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
      <div className="restaurant-bg">
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center">
            <Spinner animation="grow" variant="light" size="lg" />
            <h4 className="mt-3 text-white">Loading Restaurants...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="restaurant-bg">
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Card className="p-4 shadow">
            <h4 className="text-danger">{error}</h4>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="restaurant-bg">
      <Container style={{ padding: '50px 0' }}>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-white mb-3">Explore Restaurants</h2>
          <p className="lead text-light">Discover the finest dining experiences in your city</p>
        </div>

        <Row>
          {restaurants.length > 0 ? (
            restaurants.map((res, index) => (
              <Col md={6} lg={4} key={res._id} className="mb-4">
                <Card className="shadow-lg rounded overflow-hidden border-0 h-100 restaurant-card">
                  <div className="card-img-container">
                    <Card.Img
                      variant="top"
                      src={res.image}
                      alt={res.name}
                      className="img-fluid"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="rating-badge">
                      <span className="badge bg-danger">
                        {Math.floor(Math.random() * 2 + 3)}.{(Math.random() * 9).toFixed(1)} ★
                      </span>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold text-danger fs-5 mb-2">{res.name}</Card.Title>
                    <Card.Text className="text-muted fst-italic mb-1">
                      <small>{res.cuisine}</small>
                    </Card.Text>
                    <Card.Text className="text-secondary mb-3" style={{ fontSize: "0.95rem" }}>
                      <i className="fas fa-map-marker-alt text-danger me-2"></i>
                      {res.address || "City Center"}
                    </Card.Text>
                    <Link to={`/restaurant/${res._id}`} className="mt-auto">
                      <Button variant="danger" className="w-100 fw-semibold">
                        <i className="fas fa-utensils me-2"></i> View Menu
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <Card className="p-4 shadow">
                <h4 className="text-danger">No restaurants found.</h4>
              </Card>
            </Col>
          )}
        </Row>
      </Container>

      
    </div>
  );
};

export default Restaurants;
