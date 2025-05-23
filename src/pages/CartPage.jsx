import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Container, Button, Card, Row, Col, Badge, Alert, Modal, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft, FaCheckCircle, FaCreditCard } from "react-icons/fa";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = total > 299 ? 0 : 40;
  const tax = total * 0.05;
  const grandTotal = total + deliveryFee + tax;

  const handleIncreaseQty = (item) => {
    dispatch({ type: "INCREASE_QTY", payload: item.id });
  };

  const handleDecreaseQty = (item) => {
    if (item.qty > 1) {
      dispatch({ type: "DECREASE_QTY", payload: item.id });
    }
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  const processPayment = async () => {
    if (!isLoggedIn) {
      alert("Please login to place the order");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);
    setShowPaymentModal(true);

    try {
    
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPaymentSuccess(true);
      const paidAmount = grandTotal;
      
      dispatch({ type: "CLEAR_CART" });
      
      setTimeout(() => {
        setShowPaymentModal(false);
        navigate("/orders", { 
          state: { 
            paymentSuccess: true,
            amount: paidAmount,
            items: cart.length
          } 
        });
      }, 5000);
    } catch (error) {
      setPaymentSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page-bg">
      <Container style={{ padding: '40px 0' }}>
        <Button 
          variant="light" 
          onClick={() => navigate(-1)} 
          className="mb-4 d-flex align-items-center gap-2"
        >
          <FaArrowLeft /> Continue Shopping
        </Button>

        {cart.length === 0 ? (
          <Card className="shadow-sm border-0 text-center p-5" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
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
              <Card className="shadow-sm border-0 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
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
                        src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"} 
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
                            onClick={() => removeFromCart(item.id)}
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
              <Card className="shadow-sm border-0 sticky-top" style={{ top: "20px", backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <Card.Body className="p-0">
                  <div className="p-4 border-bottom">
                    <h4 className="mb-4 fw-bold">Order Summary</h4>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Subtotal</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Delivery Fee</span>
                        <span className={deliveryFee === 0 ? "text-success" : ""}>
                          {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Tax (5%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-top pt-3 mb-4">
                      <div className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total Amount</span>
                        <span className="text-danger">₹{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {total < 299 && (
                      <Alert variant="light" className="d-flex align-items-center gap-2 mb-4">
                        <div>
                          <strong>Add ₹{(299 - total).toFixed(2)} more</strong> to get free delivery
                        </div>
                      </Alert>
                    )}

                    <div className="bg-danger bg-opacity-10 p-3 rounded mb-4">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <FaCreditCard className="text-danger" />
                        <h6 className="mb-0 text-danger">Payment Amount</h6>
                      </div>
                      <h4 className="text-danger mb-0 text-end">₹{grandTotal.toFixed(2)}</h4>
                    </div>

                    <Button 
                      variant="danger" 
                      size="lg" 
                      className="w-100 py-3 fw-bold"
                      onClick={processPayment}
                      disabled={loading || cart.length === 0}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Processing Payment
                        </span>
                      ) : (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <FaCreditCard /> Pay ₹{grandTotal.toFixed(2)}
                        </span>
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Payment Modal */}
        <Modal show={showPaymentModal} onHide={() => !loading && setShowPaymentModal(false)} centered>
          <Modal.Header closeButton={!loading} className="border-0 bg-danger text-white">
            <Modal.Title className="fw-bold">Payment Gateway</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 py-3 bg-danger bg-opacity-10">
            {loading ? (
              <div className="py-3 text-center">
                <ProgressBar 
                  animated 
                  now={80} 
                  className="mb-3" 
                  style={{ height: "6px" }}
                  variant="warning"
                />
                <h5 className="mb-2">Processing Payment</h5>
                <p className="text-muted">Charging ₹{grandTotal.toFixed(2)} to your account</p>
              </div>
            ) : paymentSuccess ? (
              <div className="text-center py-3">
                <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                  <FaCheckCircle size={48} className="text-success" />
                </div>
                <h4 className="text-success mb-3">Payment Successful!</h4>
                <div className="bg-light p-3 rounded mb-3">
                  <h5 className="mb-0">₹{grandTotal.toFixed(2)}</h5>
                  <small className="text-muted">Amount Paid</small>
                </div>
                <p className="text-muted">You'll be redirected to orders page shortly</p>
              </div>
            ) : (
              <div className="text-center py-3">
                <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3">
                  <div className="text-danger" style={{ fontSize: "48px", lineHeight: 1 }}>✕</div>
                </div>
                <h4 className="text-danger mb-3">Payment Failed</h4>
                <p className="text-muted mb-4">We couldn't process your payment of ₹{grandTotal.toFixed(2)}</p>
                <div className="d-flex gap-3 justify-content-center">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={processPayment}
                    className="px-4"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </Container>

    
    </div>
  );
};

export default CartPage;