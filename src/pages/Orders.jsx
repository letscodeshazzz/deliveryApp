import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/orders/${email}`);
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading orders...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info">You have no orders yet.</Alert>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="mb-3 shadow-sm">
            <Card.Body>
              <h5>Order ID: {order._id}</h5>
              <p><strong>Restaurant:</strong> {order.restaurantName || "N/A"}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} × {item.qty} — ₹{item.price}</li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Orders;
