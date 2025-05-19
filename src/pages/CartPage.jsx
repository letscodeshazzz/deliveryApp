import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Container, Button, Card, Row, Col, Badge, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const { isLoggedIn, email } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = 40;
  const tax = total * 0.05;
  const grandTotal = total + deliveryFee + tax;

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("Please login to place the order");
      return;
    }

    try {
      await axios.post("/api/orders", {
        userEmail: email,
        items: cart,
        totalAmount: grandTotal,
        restaurantName: cart[0]?.restaurantName || "Unknown",
      });

      dispatch({ type: "CLEAR_CART" });
      navigate("/orders");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const handleIncreaseQty = (item) => {
    dispatch({ type: "INCREASE_QTY", payload: item.id });
  };

  const handleDecreaseQty = (item) => {
    if (item.qty > 1) {
      dispatch({ type: "DECREASE_QTY", payload: item.id });
    }
  };

  return (
    <Container className="my-5">
      <Button 
        variant="outline-" 
        onClick={() => navigate(-1)} 
        className="mb-4 d-flex align-items-center gap-2"
      >
        <FaArrowLeft /> Continue Shopping
      </Button>

      {cart.length === 0 ? (
        <Card className="shadow-sm border-0 text-center p-5">
          <FaShoppingBag size={48} className="text-muted mb-4 mx-auto" />
          <h3 className="mb-3">Your cart is empty</h3>
          <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet</p>
          <Button 
            variant="danger" 
            onClick={() => navigate("/restaurants")}
            className="px-4"
          >
            Browse Restaurants
          </Button>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="mb-0 fw-bold">Your Cart</h2>
                  <Badge bg="secondary" pill>
                    {cart.length} {cart.length === 1 ? "Item" : "Items"}
                  </Badge>
                </div>

                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="border-bottom pb-3 mb-3 d-flex gap-3"
                  >
                    <img 
                      src={item.image || "https://via.placeholder.com/80"} 
                      alt={item.name} 
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-1">{item.name}</h5>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-danger p-0"
                          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                      <p className="text-muted mb-2">{item.restaurantName}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center border rounded-pill">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            className="rounded-start-pill px-3"
                            onClick={() => handleDecreaseQty(item)}
                            disabled={item.qty <= 1}
                          >
                            <FaMinus />
                          </Button>
                          <span className="px-3">{item.qty}</span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            className="rounded-end-pill px-3"
                            onClick={() => handleIncreaseQty(item)}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                        <h5 className="mb-0 text-danger">₹{(item.price * item.qty).toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm border-0 sticky-top" style={{ top: "20px" }}>
              <Card.Body>
                <h4 className="mb-4 fw-bold">Order Summary</h4>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-top pt-3 mb-4">
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span className="text-danger">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Alert variant="success" className="d-flex align-items-center gap-2">
                  <div>
                    <strong>Free delivery</strong> on orders above ₹299
                  </div>
                </Alert>

                <Button 
                  variant="danger" 
                  size="lg" 
                  className="w-100 py-3 fw-bold"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
