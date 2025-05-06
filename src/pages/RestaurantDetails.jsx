import React from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";

const restaurantMenus = {
  1: [
    { id: 101, name: "Paneer Butter Masala", price: 250 },
    { id: 102, name: "Butter Naan", price: 100 },
    { id: 103, name: "Paneer Tikka", price: 90 },
    { id: 104, name: "Garlic naan", price: 60},
    { id: 105, name: "Dal Makkhanni", price: 40 },
    { id: 106, name: "Shahi Paneer", price: 40 },
    { id: 107, name: "Palak paneer", price: 45 },
    { id: 108, name: "Kadai paneer", price: 50},
    { id: 109, name: "Pulao", price: 40 },
  ],
  2: [
    { id: 201, name: "Cheese Burger", price: 150 },
    { id: 202, name: "French Fries", price: 100 },
    { id: 203, name: "Spaghetti Bolognese", price: 89},
    { id: 204, name: "Veg Pizza", price: 299 },
    { id: 205, name: "Margarita Pizza", price: 560},
    { id: 206, name: "Chocolate Cake", price: 50},
    { id: 207, name: "Chicken Wings", price: 120 },
  ],
  3: [
    {id:203 , name: "Haleem" , price: 350},
    {id:203 , name: "Mutton biryani" , price:200},
    {id:203 , name: "Kulcha Nihari" , price: 100},
    {id:203 , name: "Seekh kebab" , price: 150},
    {id:203 , name: "Tandoori Chicken" , price: 250},
    {id:203 , name: "Chicken Shawarama" , price: 70},
    {id:203 , name: "Chicken Biryani" , price: 120},
  ],
};



const RestaurantDetails = () => {
  const { id } = useParams();
  const menu = restaurantMenus[id] || [];

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Menu</h2>
      {menu.length === 0 ? (
        <p>No menu found for this restaurant.</p>
      ) : (
        menu.map((item) => (
          <Card key={item.id} className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>₹{item.price}</Card.Text>
              </div>
              <Button variant="success">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default RestaurantDetails;
