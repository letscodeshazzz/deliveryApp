import { Container, Form, Button, Card } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-4 text-center">Login to FoodJet</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
