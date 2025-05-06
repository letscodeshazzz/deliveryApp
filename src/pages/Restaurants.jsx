import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const sampleRestaurants = [
  { id: 1, name: "Spice Villa", cuisine: "Indian", image: "/images/food1.jpg" },
  { id: 2, name: "Burger Hub", cuisine: "American", image: "/images/food2.jpg" },
];

const Restaurants = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Explore Restaurants</h2>
      <Row>
        {sampleRestaurants.map((res) => (
          <Col md={6} lg={4} key={res.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={res.image} />
              <Card.Body>
                <Card.Title>{res.name}</Card.Title>
                <Card.Text>{res.cuisine}</Card.Text>
                <Link to={`/restaurants/${res.id}`}>
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
