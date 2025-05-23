import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, ButtonGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaBolt, FaArrowLeft } from "react-icons/fa";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [menuRes, restaurantRes] = await Promise.all([
          axios.get(`http://localhost:5175/api/restaurants/${id}/menu`)
          // axios.get(`http://localhost:5175/api/restaurants/${id}`)
        ]);
        
        const menuData = menuRes.data.menu || menuRes.data;
        setMenu(menuData);
        setRestaurant(restaurantRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart({ ...item, id: item._id });
    setAddedItems((prev) => [...prev, item._id]);
  };

  const handleOrderNow = (item) => {
    handleAddToCart(item);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="restaurant-details-bg">
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Spinner animation="border" variant="light" />
        </Container>
      </div>
    );
  }

  return (
    <div className="restaurant-details-bg">
      <Container style={{ padding: '40px 0' }}>
        <Button 
          variant="light" 
          onClick={() => navigate(-1)} 
          className="mb-4 d-flex align-items-center gap-2"
        >
          <FaArrowLeft /> Back to Restaurants
        </Button>

        {restaurant && (
          <Card className="mb-4 border-0 shadow" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
            <Card.Body className="d-flex align-items-center">
              <img 
                src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"} 
                alt={restaurant.name}
                className="rounded-circle me-4"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div>
                <h2 className="mb-1 text-danger">{restaurant.name}</h2>
                <p className="text-muted mb-1">{restaurant.cuisine}</p>
                <div className="d-flex align-items-center text-warning mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star${i < 4 ? '' : '-half-alt'}`} 
                    />
                  ))}
                  <span className="ms-2 text-dark">4.5 (120 reviews)</span>
                </div>
                <p className="text-dark mb-0">
                  <i className="fas fa-map-marker-alt text-danger me-2"></i>
                  {restaurant.address || "City Center"}
                </p>
              </div>
            </Card.Body>
          </Card>
        )}

        <Card className="border-0 shadow" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
          <Card.Header className="bg-danger text-white">
            <h3 className="mb-0">Menu</h3>
          </Card.Header>
          <Card.Body>
            {menu.length === 0 ? (
              <p className="text-center text-muted">No menu available for this restaurant.</p>
            ) : (
              menu.map((item) => (
                <div key={item._id} className="mb-3 pb-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-danger fw-bold mb-1">₹{item.price}</p>
                      {item.description && (
                        <small className="text-muted d-block">{item.description}</small>
                      )}
                    </div>
                    <ButtonGroup>
                      <Button
                        variant={addedItems.includes(item._id) ? "outline-secondary" : "outline-danger"}
                        size="sm"
                        disabled={addedItems.includes(item._id)}
                        onClick={() => handleAddToCart(item)}
                        className="d-flex align-items-center"
                      >
                        <FaShoppingCart className="me-1" />
                        {addedItems.includes(item._id) ? "Added" : "Add"}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleOrderNow(item)}
                        className="d-flex align-items-center"
                      >
                        <FaBolt className="me-1" />
                        Order Now
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              ))
            )}
          </Card.Body>
        </Card>
      </Container>

    
    </div>
  );
};

export default RestaurantDetails;












