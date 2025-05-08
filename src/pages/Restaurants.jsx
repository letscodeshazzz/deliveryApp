import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const sampleRestaurants = [
  
  { 
    id: 1, 
    name: "Paradise Biryani", 
    cuisine: "Hyderabadi Biryani", 
    image: "/images/food1.jpg", 
    location: "Hyderabad", 
    address: "Paradise Circle, Secunderabad, Hyderabad", 
    reason: "Famous for its legendary Hyderabadi biryani, attracting people from all over India."
  },
  { 
    id: 2, 
    name: "Shadab Restaurant", 
    cuisine: "Hyderabadi Non-Veg", 
    image: "/images/food2.jpg", 
    location: "Hyderabad", 
    address: "Opp. Charminar, Hyderabad", 
    reason: "Known for its rich Mughlai and Hyderabadi non-veg dishes, particularly the mutton and chicken."
  },
  
  
  { 
    id: 3, 
    name: "Karim's", 
    cuisine: "Mughlai", 
    image: "/images/food3.jpg", 
    location: "Delhi", 
    address: "Old Delhi, Jama Masjid, Delhi", 
    reason: "A centuries-old restaurant serving authentic Mughlai dishes, particularly their kebabs and mutton."
  },
  { 
    id: 4, 
    name: "Khan Chacha", 
    cuisine: "North Indian", 
    image: "/images/food4.jpg", 
    location: "Delhi", 
    address: "Khan Market, New Delhi", 
    reason: "Famous for its kebabs, rolls, and North Indian-style grilled chicken and mutton dishes."
  },
  
 
  { 
    id: 5, 
    name: "Shree Thaker Bhojanalay", 
    cuisine: "Gujarati Thali", 
    image: "/images/food5.jpg", 
    location: "Mumbai", 
    address: "Tardeo, Mumbai", 
    reason: "Famous for its authentic Gujarati thali, served in a traditional manner with an array of flavors."
  },
  { 
    id: 6, 
    name: "Sarvi Restaurant", 
    cuisine: "Vegetarian", 
    image: "/images/food6.jpg", 
    location: "Mumbai", 
    address: "Mohammad Ali Road, Mumbai", 
    reason: "Known for its iconic vegetarian Pulao, biryani, and other delectable vegetarian dishes."
  },
  

  { 
    id: 7, 
    name: "Tunday Kababi", 
    cuisine: "Awadhi Non-Veg", 
    image: "/images/food7.jpg", 
    location: "Lucknow", 
    address: "Mauza, Chowk, Lucknow", 
    reason: "Famous for its mouthwatering Tunday Kebabs, a rich legacy of Awadhi cuisine."
  },
  { 
    id: 8, 
    name: "Idris Biryani", 
    cuisine: "Awadhi Non-Veg", 
    image: "/images/food8.jpg", 
    location: "Lucknow", 
    address: "Gulabrai Market, Lucknow", 
    reason: "A legendary place known for its delectable mutton biryani, a must-visit for biryani lovers."
  },

 
  { 
    id: 9, 
    name: "Virat's Kitchen", 
    cuisine: "North Indian", 
    image: "/images/food9.jpg", 
    location: "Bangalore", 
    address: "Koramangala, Bangalore", 
    reason: "Popular for serving mouthwatering North Indian and Tandoori dishes, it's a favorite among cricket fans due to its association with cricketer Virat Kohli. The restaurant is known for its cozy ambiance and flavorful kebabs."
  }
];

const Restaurants = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center" style={{ fontFamily: "Arial, sans-serif", fontSize: "2rem", color: "#4a4a4a" }}>
        Explore Famous Restaurants Across India
      </h2>
      <Row className="g-4">
        {sampleRestaurants.map((res) => (
          <Col md={6} lg={4} key={res.id} className="mb-4 d-flex justify-content-center">
            <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ width: "100%", height: "100%" }}>
              <Card.Img
                variant="top"
                src={res.image}
                style={{ height: "200px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
              />
              <Card.Body className="p-4">
                <Card.Title className="fs-4 fw-bold text-center text-dark">{res.name}</Card.Title>
                <Card.Text className="text-center text-muted">{res.cuisine}</Card.Text>
                <Card.Text className="text-center text-muted">{res.location}</Card.Text>
                <Card.Text className="text-center text-muted">{res.address}</Card.Text>
                <Card.Text className="text-center">{res.reason}</Card.Text>
                <div className="d-flex justify-content-center">
                  <Link to={`/restaurants/${res.id}`}>
                    <Button
                      variant="danger"
                      className="px-4 py-2"
                      style={{ fontSize: "1rem", fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Restaurants;
