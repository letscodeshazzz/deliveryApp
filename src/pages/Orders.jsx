import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert, Row, Col, Button, Badge } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paidOrders, setPaidOrders] = useState({});  // Paid orders state

  const email = localStorage.getItem("email");

  // Load paidOrders from localStorage on mount
  useEffect(() => {
    const savedPaidOrders = localStorage.getItem("paidOrders");
    if (savedPaidOrders) {
      setPaidOrders(JSON.parse(savedPaidOrders));
    }

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

  const handlePayNow = (orderId, totalAmount) => {
    alert(`Ammount paid! Your order will be delivered in next 30 minutes.`);

    setPaidOrders(prev => {
      const updated = { ...prev, [orderId]: true };
      localStorage.setItem("paidOrders", JSON.stringify(updated));  // Save in localStorage
      return updated;
    });
  };

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
      <h2 className="mb-4 text-center text-danger fw-bold">Your Order History</h2>
      {orders.length === 0 ? (
        <Alert variant="info">You haven't placed any orders yet.</Alert>
      ) : (
        orders.map((order) => {
          const isPaid = paidOrders[order._id];
          return (
            <Card key={order._id} className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <h4 style={{ color: "#e53935", fontWeight: "bold" }}>Thanks for ordering!</h4>
                    <p className="mb-1">
                      <strong>Restaurant:</strong> {order.restaurantName && order.restaurantName !== "N/A" ? order.restaurantName : "Top Restaurants"}
                    </p>
                    <p className="mb-1">
                      <strong>Status: </strong>
                      {isPaid ? (
                        <Badge bg="success">Success</Badge>
                      ) : (
                        <Badge bg={order.status === "Completed" ? "success" : "warning"}>
                          {order.status || "Pending"}
                        </Badge>
                      )}
                    </p>
                    {isPaid && (
                      <p style={{color: "green", fontWeight: "bold", marginTop: '10px'}}>
                        Your order will be delivered in next 30 minutes.
                      </p>
                    )}
                    {isPaid && (
                      <h3 style={{color: "red", fontWeight: "bold", marginTop: '10px'}}>
                        PAID
                      </h3>
                    )}
                  </Col>
                  <Col xs={12} md={6} className="text-md-end">
                    <p className="mb-1"><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p className="mb-1"><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-2"
                      disabled={isPaid}
                      onClick={() => handlePayNow(order._id, order.totalAmount)}
                    >
                      Pay Now
                    </Button>
                  </Col>
                </Row>

                <h6 className="mt-3">Items:</h6>
                <ul className="mb-0">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.qty} — ₹{item.price}
                    </li>
                  ))}
                </ul>

                {isPaid && (
                  <div style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem", marginTop: "20px", textAlign: "center" }}>
                    Your order will be delivered in next 30 minutes
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default Orders;
