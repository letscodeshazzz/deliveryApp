import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required");
    } else {
      setError("");
      login(form.email);
      alert("Login successful!");
      navigate("/orders");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
     
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)", 
      }}
    >
      <Container>
        <Card
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(255, 255, 255, 0.85)", 
            borderRadius: "15px",
            padding: "2rem",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
          className="mx-auto"
        >
          <h3 className="text-center mb-3">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="danger">
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
