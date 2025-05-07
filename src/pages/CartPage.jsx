import React from "react";
import { useCart } from "../context/CartContext";
import { Container, ListGroup, Button } from "react-bootstrap";

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Container className="mt-5">
      <h2>Your Cart</h2>
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.name}</strong> x {item.qty}
            </div>
            <div>₹{item.price * item.qty}</div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4 className="mt-4">Total: ₹{total}</h4>
    </Container>
  );
};

export default CartPage;

