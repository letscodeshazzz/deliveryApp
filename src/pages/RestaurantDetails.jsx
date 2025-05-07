import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container, Toast } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const restaurantMenus = {
  1: [
    { id: 101, name: "Paneer Butter Masala", price: 250 },
    { id: 102, name: "Butter Naan", price: 100 },
    { id: 103, name: "Aloo Gobi", price: 180 },
    { id: 104, name: "Baingan Bharta", price: 220 },
    { id: 105, name: "Dal Tadka", price: 150 },
    { id: 106, name: "Chole Bhature", price: 200 },
    { id: 107, name: "Palak Paneer", price: 240 },
    { id: 108, name: "Veg Biryani", price: 270 },
    { id: 109, name: "Pulao", price: 150 },
    { id: 110, name: "Malai Kofta", price: 280 },
  ],
  2: [
    { id: 201, name: "Cheese Burger", price: 150 },
    { id: 202, name: "Chicken Burger", price: 200 },
    { id: 203, name: "Veg Burger", price: 120 },
    { id: 204, name: "Double Cheese Burger", price: 250 },
    { id: 205, name: "Beef Burger", price: 300 },
    { id: 206, name: "BBQ Chicken Burger", price: 250 },
    { id: 207, name: "Fish Burger", price: 220 },
    { id: 208, name: "Paneer Tikka Burger", price: 180 },
    { id: 209, name: "Spicy Chicken Burger", price: 220 },
    { id: 210, name: "Classic Veg Burger", price: 140 },
  ],
  3: [
    { id: 301, name: "Haleem", price: 350 },
    { id: 302, name: "Chicken Biryani", price: 500 },
    { id: 303, name: "Mutton Korma", price: 600 },
    { id: 304, name: "Tunday Kebab", price: 450 },
    { id: 305, name: "Chicken Seekh Kebab", price: 400 },
    { id: 306, name: "Mutton Seekh Kebab", price: 550 },
    { id: 307, name: "Butter Chicken", price: 400 },
    { id: 308, name: "Grilled Fish", price: 600 },
    { id: 309, name: "Chicken Tikka", price: 350 },
    { id: 310, name: "Mutton Pulao", price: 500 },
  ],
};

const RestaurantDetails = () => {
  const { id } = useParams();
  const menu = restaurantMenus[id] || [];
  const { dispatch } = useCart();
  const [addedToCart, setAddedToCart] = useState(null);

  const addToCart = (item) => {

    dispatch({ type: "ADD_TO_CART", payload: item });

    setAddedToCart(item);

    setTimeout(() => setAddedToCart(null), 3000);
  };

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
              <Button variant="danger" onClick={() => addToCart(item)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))
      )}

    
      {addedToCart && (
        <Toast
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1,
          }}
          bg="success"
          autohide
          delay={3000}
        >
          <Toast.Body>
            {addedToCart.name} added to cart!
          </Toast.Body>
        </Toast>
      )}
    </Container>
  );
};

export default RestaurantDetails;
