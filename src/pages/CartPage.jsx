import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Container, ListGroup, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const { user } = useAuth();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    try {
      if (!user || !user.email) {
        alert("⚠️ Please log in to place an order.");
        return;
      }

      await axios.post("http://localhost:5000/api/orders", {
        userEmail: user.email,
        items: cart,
        total,
      });

      dispatch({ type: "CLEAR_CART" });
      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm" style={{ backgroundColor: "#ffffff" }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ fontSize: '2rem', color: '#D32F2F' }}>
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
                    borderRadius: '8px',
                    marginBottom: '10px',
                    backgroundColor: '#F9F9F9'
                  }}
                >
                  <Row className="w-100">
                    <Col xs={8} className="d-flex flex-column">
                      <strong>{item.name}</strong>
                      <span>Qty: {item.qty}</span>
                    </Col>
                    <Col xs={4} className="d-flex justify-content-end align-items-center">
                      <div className="d-flex flex-column text-right">
                        <div>₹{item.price * item.qty}</div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="mt-2"
                          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                          style={{ borderRadius: '50px', borderColor: '#D32F2F' }}
                        >
                          Remove
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {cart.length > 0 && (
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <h4>Total: <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#D32F2F' }}>₹{total}</span></h4>
              <Button
                variant="danger"
                className="px-4 py-2"
                style={{ borderRadius: '50px' }}
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
