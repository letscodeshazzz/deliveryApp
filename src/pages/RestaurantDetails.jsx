import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../context/CartContext";

const RestaurantDetails = () => {
  const { id } = useParams(); // 
  const [menu, setMenu] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log(` Fetching menu for restaurant ID: ${id}`);
        const res = await axios.get(`http://localhost:5000/api/restaurants/${id}/menu`);

        
        const menuData = res.data.menu || res.data;

        console.log(" Menu fetched successfully:", menuData);
        setMenu(menuData);
      } catch (err) {
        console.error(" Failed to fetch menu:", err.response?.data || err.message);
      }
    };

    fetchMenu();
  }, [id]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Menu</h2>

      {menu.length === 0 ? (
        <p>No menu available for this restaurant.</p>
      ) : (
        menu.map((item) => (
          <Card key={item._id} className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>₹{item.price}</Card.Text>
              </div>
              <Button
                variant="danger"
                onClick={() => addToCart({ ...item, id: item._id })}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default RestaurantDetails;


































//   1: [
//     { id: 101, name: "Paneer Butter Masala", price: 250 },
//     { id: 102, name: "Butter Naan", price: 100 },
//     { id: 103, name: "Aloo Gobi", price: 180 },
//     { id: 104, name: "Baingan Bharta", price: 220 },
//     { id: 105, name: "Dal Tadka", price: 150 },
//     { id: 106, name: "Chole Bhature", price: 200 },
//     { id: 107, name: "Palak Paneer", price: 240 },
//     { id: 108, name: "Veg Biryani", price: 270 },
//     { id: 109, name: "Pulao", price: 150 },
//     { id: 110, name: "Malai Kofta", price: 280 },
//   ],
//   2: [
//     { id: 201, name: "Cheese Burger", price: 150 },
//     { id: 202, name: "Chicken Burger", price: 200 },
//     { id: 203, name: "Veg Burger", price: 120 },
//     { id: 204, name: "Double Cheese Burger", price: 250 },
//     { id: 205, name: "Beef Burger", price: 300 },
//     { id: 206, name: "BBQ Chicken Burger", price: 250 },
//     { id: 207, name: "Fish Burger", price: 220 },
//     { id: 208, name: "Paneer Tikka Burger", price: 180 },
//     { id: 209, name: "Spicy Chicken Burger", price: 220 },
//     { id: 210, name: "Classic Veg Burger", price: 140 },
//     { id: 210, name: "White Sauce Pasta", price: 300 },
//   ],
//   3: [
//     { id: 301, name: "Haleem", price: 350 },
//     { id: 302, name: "Chicken Biryani", price: 500 },
//     { id: 303, name: "Mutton Korma", price: 600 },
//     { id: 304, name: "Tunday Kebab", price: 450 },
//     { id: 305, name: "Chicken Seekh Kebab", price: 400 },
//     { id: 306, name: "Mutton Seekh Kebab", price: 550 },
//     { id: 307, name: "Butter Chicken", price: 400 },
//     { id: 308, name: "Grilled Fish", price: 600 },
//     { id: 309, name: "Chicken Tikka", price: 350 },
//     { id: 310, name: "Mutton Pulao", price: 500 },
//   ],
// };


// const restaurantNames = {
//   1: "Moti Mahal-all your tasties here",
//   2: "Home Sweet Home-time for yumm",
//   3: "Tunday Kebab-shaahi zaika nawabo ka",
// };

