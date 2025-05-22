import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import { FaStar, FaUtensils, FaShippingFast, FaLeaf } from "react-icons/fa";

const categories = [
  {
    name: "Cakes",
    image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Drinks",
    image: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Desserts",
    image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Biryani",
    image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Pulao",
    image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Fried Chicken",
    image: "https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?auto=compress&cs=tinysrgb&w=600",
  }]

const restaurantsLucknow = [
  { id: 1, name: "The Mughal's Dastarkhwan", description: "Authentic Mughlai Cuisine", rating: 4.8, image: './images/dastarkhwan.jpg', deliveryTime: "30-45 min" },
  { id: 2, name: "Tunday Kebab", description: "Nawabi Taste of Lucknow", rating: 4.7, image: "./images/tunday.jpg", deliveryTime: "25-40 min" },
  { id: 3, name: "Home Sweet Home", description: "Family Meals & Snacks", rating: 4.6, image: "./images/home1.jpg", deliveryTime: "20-35 min" },
];

const restaurantsDelhi = [
  { id: 4, name: "Delhi Darbar", description: "Mughlai Royalty", rating: 4.8, image: "images/delhi.jpg", deliveryTime: "35-50 min" },
  { id: 5, name: "Havemore", description: "Legendary North Indian Flavours", rating: 4.7, image: "./images/have.jpg", deliveryTime: "30-45 min" },
  { id: 6, name: "Sagar Ratna", description: "Best South Indian in Delhi", rating: 4.5, image: "./images/sagar.jpg", deliveryTime: "25-40 min" },
];

const restaurantsHyderabad = [
  { id: 7, name: "Paradise Biryani", description: "Iconic Hyderabadi Biryani", rating: 4.9, image: "./images/para.jpg", deliveryTime: "40-55 min" },
  { id: 8, name: "Bawarchi", description: "Biryani & Grill Experts", rating: 4.6, image: "./images/bawarchi.jpg", deliveryTime: "35-50 min" },
  { id: 9, name: "Pista House", description: "Authentic Hyderabadi Delights", rating: 4.5, image: "./images/pista.jpg", deliveryTime: "30-45 min" },
];

const offers = [
  {
    id: 1,
    title: "50% OFF",
    description: "On your first order with FoodJet",
    code: "NEW50",
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "Free Delivery",
    description: "On orders above ₹299",
    code: "FREESHIP",
    image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "Combo Meal",
    description: "Get burger + fries + drink for ₹199",
    code: "COMBO199",
    image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      <div
        className="hero-section py-5 py-lg-7"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-3 fw-bold mb-4 text-white">
             Craving <span className="text-danger">something</span>  <span className="text-warning">delicious?</span>
              </h1>
              <p className="lead mb-4 text-white fs-3">
                Order from your favorite restaurants with <span className="text-warning fw-bold">FoodJet  <img src="" alt="" srcset="" /></span>
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="outline-warning"
                  size="lg"
                  as={Link}
                  to="/restaurants"
                  className="fw-bold px-4 py-3 fs-5 text-white"
                >
                  Browse Restaurants
                </Button>

              </div>
            </Col>
          </Row>
        </Container>
      </div>


      <div className="py-5 bg-white">
        <Container>
          <Row className="g-4 text-center">
            <Col md={4}>
              <div className="p-4 rounded-3 shadow-sm bg-light">
                <FaShippingFast className="text-danger mb-3" size={48} />
                <h3 className="fw-bold">Fast Delivery</h3>
                <p className="text-muted">Get your food delivered in under 30 minutes</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 rounded-3 shadow-sm bg-light">
                <FaUtensils className="text-danger mb-3" size={48} />
                <h3 className="fw-bold">Fresh Food</h3>
                <p className="text-muted">Only the freshest ingredients from trusted partners</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 rounded-3 shadow-sm bg-light">
                <FaLeaf className="text-danger mb-3" size={48} />
                <h3 className="fw-bold">Healthy Options</h3>
                <p className="text-muted">Discover our selection of healthy meals</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5 bg-warning mb-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold display-5 text-black">Explore Categories</h2>
          <Row className="g-4">
            {categories.map((cat, idx) => (
              <Col key={idx} md={6} lg={4}>
                <Card className="border-0 shadow-sm h-100 hover-scale" style={{ transition: 'transform 0.3s' }}>
                  <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <Card.Img
                      variant="top"
                      src={cat.image}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', filter: 'brightness(0.8)' }}
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white">
                      <h3 className="fw-bold mb-0">{cat.name}</h3>
                    </div>
                  </div>
                  <Card.Body className="text-center bg-black">
                    <Button variant="outline-warning" as={Link} to="/restaurants" className="w-100">
                      Order Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="py-5 bg-warning">
        <Container>
          <h2 className="text-center   mb-5 fw-bold display-5 text-black">Special Offers</h2>
          <Carousel indicators={false} className="rounded-4 overflow-hidden shadow">
            {offers.map((offer) => (
              <Carousel.Item key={offer.id} style={{ height: '400px' }}>
                <div className="position-relative h-100">
                  <img
                    className="d-block w-100 h-100"
                    src={offer.image}
                    alt={offer.title}
                    style={{ objectFit: 'cover', filter: 'brightness(0.7)' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white p-4">
                    <h2 className="display-4 fw-bold text-warning">{offer.title}</h2>
                    <p className="fs-4">{offer.description}</p>
                    <div className="bg-white text-dark p-2 rounded-3 mt-3">
                      <span className="fw-bold">Use code: </span>
                      <span className="text-danger fw-bold">{offer.code}</span>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>

      {/* City Restaurants Sections */}
      <Section title="Top Restaurants in Lucknow " data={restaurantsLucknow} bgColor="bg-white text-danger" />
      <Section title="Top Restaurants in Delhi" data={restaurantsDelhi} bgColor="bg-white text-danger" />
      <Section title="Top Restaurants in Hyderabad" data={restaurantsHyderabad} bgColor="bg-white text-danger" />

      {/* CTA Section */}
      <div className="py-5 text-white" style={{ backgroundColor: "rgb(250, 35, 35)" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold display-6 mb-3 text-warning">Download Our App</h2>
              <p className="fs-5 mb-4">Get exclusive app-only offers and faster ordering</p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg" className="text-dark fw-bold">
                  <i className="bi bi-apple me-2"></i> App Store
                </Button>
                <Button
                  variant="dark"
                  size="lg"
                  className="fw-bold"
                  href="https://play.google.com/store/apps/details?id=com.foodjet.user&pli=1"
                  target="_blank"
                >
                  <i className="bi bi-google-play me-2"></i>
                  Google Play
                </Button>

              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </div>
  );
};


const Section = ({ title, data, bgColor }) => (
  <div className={`py-5 ${bgColor}`}>
    <Container>
      <h2 className="text-center mb-5 fw-bold display-5">{title}</h2>
      <Row className="g-4 justify-content-center">
        {data.map((restaurant) => (
          <Col key={restaurant.id} xs={12} md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100 hover-scale" style={{ transition: 'transform 0.3s' }}>
              <div className="position-relative" style={{ height: '200px' }}>
                <Card.Img
                  variant="top"
                  src={restaurant.image}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 end-0 bg-warning text-dark p-2 rounded-bottom-left">
                  <FaStar className="me-1" /> {restaurant.rating}
                </div>
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">{restaurant.name}</Card.Title>
                <Card.Text className="text-muted">{restaurant.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="text-muted">
                    <i className="bi bi-clock me-1"></i> {restaurant.deliveryTime}
                  </span>
                  <Button variant="outline-danger" size="sm" as={Link} to={`/restaurant-about/${restaurant.id}`}>
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="outline-danger" as={Link} to="/restaurants" className="px-4">
          View All Restaurants
        </Button>
      </div>
    </Container>
  </div>
);

export default Home;