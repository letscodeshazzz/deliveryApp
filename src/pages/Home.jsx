import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Home = () => {

  const categories = [
    { name: "Pizza", image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Biryani", image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Burgers", image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Desserts", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Chinese", image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Drinks", image: "https://images.pexels.com/photos/2664149/pexels-photo-2664149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
  ];

  
  const restaurants = [
    { 
      id: 1, 
      name: "Moti Mahal", 
      description: "Award-winnin Veg and authentic  cuisine", 
      rating: 4.8,
      image: "/images/Moti.jpg"
    },
    { 
      id: 2, 
      name: "Home Sweet Home", 
      description: "Pizza burgers with premium ingredients ", 
      rating: 4.6,
      image: "/images/Homesweet.jpg"
    },
    {
      id: 3,
      name: "Tunday Kebab",
      description: "The Nawabi Taste of Lucknow – Shaahi Zaika",
      rating: 4.7,
      image: "/images/tunday.jpg"
    }
    
    
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      {}
      <div className="hero-section py-5 py-lg-7" style={{
        background: 'linear-gradient(rgba(255, 0, 0, 0.9), rgba(255, 0, 0, 0.8)), url(https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4 text-white">
                Hungry? Order now on <span className="text-warning">FoodJet</span>
              </h1>
              <p className="lead mb-4 text-white fs-4">
                Explore restaurants, food items, and offers near you!
              </p>
              <Button 
                variant="light" 
                color="red"
                size="lg" 
                as={Link} 
                to="/restaurants"
                className="fw-semibold px-4 py-3 fs-5"
              >
                Browse Restaurants
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {}
      <div className="bg-light py-5 w-100">
        <Container>
          <h2 className="mb-4 fw-bold">Popular Categories</h2>
          <Row className="g-4">
            {categories.map((category, idx) => (
              <Col key={idx} xs={6} md={4} lg={2}>
                <Card className="h-100 shadow-sm border-0">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={category.image}
                      style={{ height: "140px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center">
                      <h5 className="text-white fw-bold mb-0">{category.name}</h5>
                    </div>
                  </div>
                  <Card.Body className="text-center">
                    <Button 
                      variant="outline-danger" 
                      className="w-100" 
                      as={Link} 
                      to="/restaurants"
                    >
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {}
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 fw-bold">Top Restaurants</h2>
          <Button variant="outline-danger" as={Link} to="/restaurants">
            View All
          </Button>
        </div>
        
        <Row className="g-4">
          {restaurants.map((restaurant) => (
            <Col xs={12} md={6} lg={4} key={restaurant.id}>
              <Card className="h-100 shadow border-0">
                <Card.Img
                  variant="top"
                  src={restaurant.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0 fw-bold">{restaurant.name}</Card.Title>
                    <span className="badge bg-success d-flex align-items-center">
                      <i className="bi bi-star-fill me-1"></i> {restaurant.rating}
                    </span>
                  </div>
                  <Card.Text>{restaurant.description}</Card.Text>
                  <div className="d-flex gap-2 mt-3">
                    <Button 
                      variant="danger" 
                      as={Link} 
                      to={`/restaurant/${restaurant.id}`}
                      className="flex-grow-1"
                    >
                      View Menu
                    </Button>
                    <Button 
                      variant="outline-secondary"
                      className="btn-icon"
                    >
                      <i className="bi bi-heart"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;