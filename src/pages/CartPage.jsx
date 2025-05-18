import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Container, ListGroup, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const { isLoggedIn, email } = useAuth();
  const navigate = useNavigate(); // ✅ Navigation hook

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("Please login to place the order");
      return;
    }

    try {
      await axios.post("/api/orders", {
        userEmail: email,
        items: cart,
        totalAmount: total,
        restaurantName: cart[0]?.restaurantName || "Unknown",
      });

      dispatch({ type: "CLEAR_CART" });
      navigate("/orders"); // ✅ Navigate after success
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
    <Container className="mt-5">
      <Card className="shadow-sm" style={{ backgroundColor: "#ffffff" }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ fontSize: "2rem", color: "#D32F2F" }}>
            Your Cart
          </h2>
          <ListGroup>
            {cart.length === 0 ? (
              <ListGroup.Item className="text-center">
                <h4>Your cart is empty.</h4>
              </ListGroup.Item>
            ) : (
              cart.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center p-3"
                  style={{
                    borderRadius: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#F9F9F9",
                  }}
                >
                  <Row className="w-100 align-items-center">
                    <Col xs={6} className="d-flex flex-column">
                      <strong>{item.name}</strong>
                      <div className="mt-2 d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleDecreaseQty(item)}
                          className="me-2"
                        >
                          −
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleIncreaseQty(item)}
                          className="ms-2"
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col xs={3}>
                      ₹{item.price * item.qty}
                    </Col>
                    <Col xs={3} className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                        }
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {cart.length > 0 && (
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <h4>
                Total:{" "}
                <span style={{ fontWeight: "bold", fontSize: "1.25rem", color: "#D32F2F" }}>
                  ₹{total}
                </span>
              </h4>
              <Button
                variant="danger"
                className="px-4 py-2"
                style={{ borderRadius: "50px" }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CartPage;
