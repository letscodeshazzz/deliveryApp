import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const restaurantDetails = {
  1: {
    name: "The Mughal's Dastarkhwan",
    image: "/images/dastarkhwan.jpg",
    description: "Authentic Mughlai food with royal taste.",
    location: "Aminabad, Lucknow",
    established: "1984",
    founder: "Late Haji Mohammad Usman"
  },
  2: {
    name: "Home Sweet Home",
    image: "/images/home1.jpg",
    description: "Modern eatery with pizza, burgers and cozy ambience.",
    location: "Hazratganj, Lucknow",
    established: "2015",
    founder: "Chef Aman Verma"
  },
  3: {
    name: "Tunday Kebab",
    image: "/images/tunday.jpg",
    description: "World-famous Galawati kebabs since generations.",
    location: "Chowk, Lucknow",
    established: "1905",
    founder: "Haji Murad Ali"
  }
};

const RestaurantAbout = () => {
  const { id } = useParams();
  const restaurant = restaurantDetails[id];

  if (!restaurant) {
    return (
      <Container className="mt-5">
        <h4>Restaurant not found.</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow border-0">
        <Card.Img 
          variant="top" 
          src={restaurant.image} 
          style={{ height: "300px", objectFit: "cover" }} 
        />
        <Card.Body>
          <h2 className="fw-bold text-danger">{restaurant.name}</h2>
          <p className="text-muted">{restaurant.description}</p>
          <hr />
          <p><strong>Location:</strong> {restaurant.location}</p>
          <p><strong>Founded:</strong> {restaurant.established}</p>
          <p><strong>Founder:</strong> {restaurant.founder}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantAbout;
