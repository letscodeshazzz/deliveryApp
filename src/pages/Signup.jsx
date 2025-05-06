import { Container, Form, Button, Card } from "react-bootstrap";

const Signup = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-4 text-center">Create your Foodjet account</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Create password" />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">Signup</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;
