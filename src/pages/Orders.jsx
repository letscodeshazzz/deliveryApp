import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.email) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${user.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="mb-3 text-danger">Order placed on {new Date(order.createdAt).toLocaleString()}</h5>
              {order.items.map((item, idx) => (
                <p key={idx} style={{ marginBottom: "5px" }}>
                  {item.name} × {item.qty} = ₹{item.price * item.qty}
                </p>
              ))}
              <hr />
              <strong>Total: ₹{order.total}</strong>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Orders;
