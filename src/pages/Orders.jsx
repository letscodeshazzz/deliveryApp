import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Container, Card, Spinner, Alert, Row, Col, 
  Button, Badge, ListGroup, Modal 
} from "react-bootstrap";
import { 
  FaCheckCircle, FaClock, FaStore, FaRupeeSign, 
  FaCalendarAlt, FaShoppingBag, FaTrash, 
  FaPlus, FaMinus 
} from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paidOrders, setPaidOrders] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [processing, setProcessing] = useState(false);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedPaidOrders = localStorage.getItem("paidOrders");
        if (savedPaidOrders) {
          setPaidOrders(JSON.parse(savedPaidOrders));
        }

        const res = await axios.get(`/api/orders/${email}`);
        setOrders(res.data.reverse());
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const handlePayNow = async (orderId, totalAmount) => {
    try {
      setProcessing(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPaidOrders(prev => {
        const updated = { ...prev, [orderId]: true };
        localStorage.setItem("paidOrders", JSON.stringify(updated));
        return updated;
      });

      // Update order status in the backend
      await axios.patch(`/api/orders/${orderId}`, { status: "Paid" });
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: "Paid" } : order
        )
      );
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleQuantityChange = async (orderId, itemId, newQty) => {
    if (newQty < 1) return;
    
    try {
      setProcessing(true);
      await axios.put(`/api/orders/${orderId}/items/${itemId}`, { qty: newQty });
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? {
                ...order,
                items: order.items.map(item => 
                  item._id === itemId ? { ...item, qty: newQty } : item
                ),
                totalAmount: order.items.reduce(
                  (sum, item) => sum + (item._id === itemId ? item.price * newQty : item.price * item.qty),
                  0
                )
              }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      setProcessing(true);
      await axios.delete(`/api/orders/${orderToDelete}`);
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderToDelete));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert("Failed to delete order. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveItem = async (orderId, itemId) => {
    try {
      setProcessing(true);
      await axios.delete(`/api/orders/${orderId}/items/${itemId}`);
      
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order._id === orderId) {
            const updatedItems = order.items.filter(item => item._id !== itemId);
            return {
              ...order,
              items: updatedItems,
              totalAmount: updatedItems.reduce((sum, item) => sum + (item.price * item.qty), 0)
            };
          }
          return order;
        })
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 py-5 text-center">
        <Spinner animation="border" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h5 className="mt-3 text-muted">Loading your orders...</h5>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          <h5>Couldn't load your orders</h5>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3" style={{ color: "#d62d20" }}>Your Order History</h2>
        <p className="text-muted">Track and manage all your past and current orders</p>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this order? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteOrder}
            disabled={processing}
          >
            {processing ? "Deleting..." : "Delete Order"}
          </Button>
        </Modal.Footer>
      </Modal>

      {orders.length === 0 ? (
        <Card className="text-center py-5 border-0 shadow-sm">
          <div className="bg-light rounded-circle p-4 d-inline-block mb-4">
            <FaShoppingBag size={48} className="text-muted" />
          </div>
          <h4 className="mb-3">No Orders Yet</h4>
          <p className="text-muted mb-4">You haven't placed any orders with us yet</p>
          <Button variant="danger" href="/restaurants">
            Browse Restaurants
          </Button>
        </Card>
      ) : (
        orders.map((order) => {
          const isPaid = paidOrders[order._id] || order.status === "Paid";
          const isCompleted = order.status === "Completed";
          const orderDate = new Date(order.createdAt);
          const formattedDate = orderDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <Card key={order._id} className="mb-4 border-0 shadow-sm overflow-hidden">
              <div className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 d-flex align-items-center">
                    <FaStore className="me-2 text-danger" />
                    {order.restaurantName || "Top Restaurants"}
                  </h5>
                  <small className="text-muted d-flex align-items-center mt-1">
                    <FaCalendarAlt className="me-2" />
                    {formattedDate}
                  </small>
                </div>
                {!isPaid && !isCompleted && (
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => {
                      setOrderToDelete(order._id);
                      setShowDeleteModal(true);
                    }}
                    disabled={processing}
                  >
                    <FaTrash />
                  </Button>
                )}
              </div>

              <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        {isPaid || isCompleted ? (
                          <FaCheckCircle size={24} className="text-success" />
                        ) : (
                          <FaClock size={24} className="text-warning" />
                        )}
                      </div>
                      <div>
                        <h5 className="mb-0">
                          {isCompleted ? "Order Delivered" : isPaid ? "Order Confirmed" : "Order Processing"}
                        </h5>
                        <small className="text-muted">
                          {isCompleted ? "Your order has been delivered" : 
                           isPaid ? "Your order has been confirmed" : 
                           "We're preparing your order"}
                        </small>
                      </div>
                    </div>

                    {isPaid && !isCompleted && (
                      <div className="d-flex align-items-center bg-light-success p-2 rounded">
                        <MdDeliveryDining className="me-2 text-success" size={20} />
                        <div>
                          <strong className="text-success">On the way!</strong>
                          <p className="mb-0 small">Your order will arrive in 30-45 minutes</p>
                        </div>
                      </div>
                    )}
                  </Col>

                  <Col md={6} className="mt-3 mt-md-0">
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">
                        <span>Order Total:</span>
                        <span className="fw-bold text-danger">
                          <FaRupeeSign className="me-1" />
                          {order.totalAmount.toFixed(2)}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">
                        <span>Status:</span>
                        <Badge bg={
                          isCompleted ? "success" : 
                          isPaid ? "primary" : 
                          "warning"
                        }>
                          {isCompleted ? "Delivered" : 
                           isPaid ? "Paid" : 
                           order.status || "Pending"}
                        </Badge>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>

                <h6 className="mb-3">Order Items:</h6>
                <ListGroup variant="flush" className="mb-4">
                  {order.items.map((item) => (
                    <ListGroup.Item key={item._id} className="d-flex justify-content-between border-0 px-0 py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <span className="fw-bold">{item.name}</span>
                          <div className="d-flex align-items-center mt-1">
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="p-1"
                              onClick={() => handleQuantityChange(order._id, item._id, item.qty - 1)}
                              disabled={item.qty <= 1 || isPaid || isCompleted || processing}
                            >
                              <FaMinus size={12} />
                            </Button>
                            <span className="mx-2">{item.qty}</span>
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="p-1"
                              onClick={() => handleQuantityChange(order._id, item._id, item.qty + 1)}
                              disabled={isPaid || isCompleted || processing}
                            >
                              <FaPlus size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="me-3">
                          <FaRupeeSign className="me-1" />
                          {(item.price * item.qty).toFixed(2)}
                        </span>
                        {!isPaid && !isCompleted && (
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            className="p-1"
                            onClick={() => handleRemoveItem(order._id, item._id)}
                            disabled={processing}
                          >
                            <FaTrash size={12} />
                          </Button>
                        )}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                {!isPaid && !isCompleted && (
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-secondary"
                      onClick={() => {
                        setOrderToDelete(order._id);
                        setShowDeleteModal(true);
                      }}
                      disabled={processing}
                    >
                      Cancel Order
                    </Button>
                    <Button 
                      variant="danger" 
                      size="lg"
                      onClick={() => handlePayNow(order._id, order.totalAmount)}
                      className="px-4"
                      disabled={processing}
                    >
                      {processing ? "Processing..." : "Pay Now"}
                    </Button>
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