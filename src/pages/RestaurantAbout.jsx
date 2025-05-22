import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col, Button, Form, Badge, Carousel } from "react-bootstrap";
import { 
  StarFill, 
  StarHalf, 
  Star, 
  Clock, 
  GeoAlt, 
  Calendar,
  HeartFill,
  Heart
} from "react-bootstrap-icons";

const restaurantDetails = {
  1: {
    name: "The Mughal's Dastarkhwan",
    description: "The Mughal's Dastarkhwan is known for its rich, aromatic Mughlai cuisine. Serving Lucknow's food lovers since 1995, we bring you authentic Awadhi flavors with royal hospitality. Our chefs have preserved the traditional cooking methods passed down through generations.",
    location: "Hazratganj, Lucknow",
    established: 1995,
    special: "Mutton Biryani, Butter Chicken, Galouti Kebab, Sheermal",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.7,
    deliveryTime: "30-45 min",
    timing: "11:00 AM - 11:00 PM",
    priceRange: "₹₹₹ (Mid-range)",
    reviews: [
      { id: 1, user: "Rahul Sharma", rating: 5, comment: "Best biryani in town! The flavors are just amazing.", date: "2023-05-15" },
      { id: 2, user: "Priya Patel", rating: 4, comment: "Great ambiance and service. Kebabs were delicious.", date: "2023-04-22" },
      { id: 3, user: "Amit Singh", rating: 4.5, comment: "Authentic Awadhi cuisine. Must try their sheermal!", date: "2023-03-10" }
    ]
  },
  2: {
    name: "Home Sweet Home",
    description: "A cozy place delivering homely meals and snacks with a modern twist. Ideal for casual dining and family outings. We focus on fresh ingredients and innovative recipes that remind you of home cooking but with restaurant-quality presentation.",
    location: "Alambagh, Lucknow",
    established: 2010,
    special: "Paneer Pizza, Burgers, Fries, Pasta, Desserts",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.3,
    deliveryTime: "25-40 min",
    timing: "10:00 AM - 10:30 PM",
    priceRange: "₹₹ (Affordable)",
    reviews: [
      { id: 1, user: "Neha Gupta", rating: 4, comment: "Loved their innovative fusion dishes. Great place for youngsters.", date: "2023-06-02" },
      { id: 2, user: "Vikram Joshi", rating: 3.5, comment: "Good food but service could be faster during peak hours.", date: "2023-05-18" }
    ]
  },
  3: {
    name: "Tunday Kebab",
    description: "Tunday Kababi is legendary for its melt-in-the-mouth Galawati Kebabs, prepared from a centuries-old secret recipe. Established in 1905, we have been serving the most tender kebabs that literally melt in your mouth, accompanied by our special Mughlai parathas.",
    location: "Aminabad, Lucknow",
    established: 1905,
    special: "Tunday Kebab, Mughlai Paratha, Boti Kebab, Biryani",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.9,
    deliveryTime: "35-50 min",
    timing: "11:30 AM - 11:00 PM",
    priceRange: "₹₹₹ (Mid-range)",
    reviews: [
      { id: 1, user: "Ananya Reddy", rating: 5, comment: "Absolute must-visit in Lucknow! The kebabs live up to their reputation.", date: "2023-06-12" },
      { id: 2, user: "Karan Malhotra", rating: 4.5, comment: "Iconic place with historic significance. Food is outstanding.", date: "2023-05-30" },
      { id: 3, user: "Divya Kapoor", rating: 4, comment: "Long queues but worth the wait. The parathas are to die for!", date: "2023-04-15" }
    ]
  },
  4: {
    name: "Delhi Darbar",
    description: "Experience Mughlai Royalty at its finest. Our chefs prepare dishes using traditional methods and the finest ingredients to bring you authentic North Indian flavors.",
    location: "Connaught Place, Delhi",
    established: 1985,
    special: "Butter Chicken, Dal Makhani, Rara Gosht",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.8,
    deliveryTime: "35-50 min",
    timing: "11:00 AM - 11:30 PM",
    priceRange: "₹₹₹₹ (Premium)",
    reviews: [
      { id: 1, user: "Rajiv Mehta", rating: 5, comment: "The butter chicken here is the best in Delhi!", date: "2023-06-10" },
      { id: 2, user: "Sunita Rao", rating: 4, comment: "Excellent ambiance and service. Food was delicious.", date: "2023-05-22" }
    ]
  },
  5: {
    name: "Havemore",
    description: "Legendary North Indian Flavours served in a contemporary setting. Known for our generous portions and rich gravies that keep customers coming back.",
    location: "Pandara Road, Delhi",
    established: 1972,
    special: "Paneer Butter Masala, Mutton Rogan Josh, Tandoori Platter",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.7,
    deliveryTime: "30-45 min",
    timing: "12:00 PM - 11:00 PM",
    priceRange: "₹₹₹ (Mid-range)",
    reviews: [
      { id: 1, user: "Arjun Khanna", rating: 4.5, comment: "Consistently good food over the years. My go-to place.", date: "2023-06-05" },
      { id: 2, user: "Meena Desai", rating: 4, comment: "Love their tandoori items. Always fresh and well-cooked.", date: "2023-05-15" }
    ]
  }
};

const RestaurantAbout = () => {
  const { id } = useParams();
  const data = restaurantDetails[id];
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState(data?.reviews || []);

  if (!data) {
    return (
      <Container className="mt-5 text-center py-5">
        <h3 className="text-danger">Restaurant details not found.</h3>
        <Button variant="outline-primary" href="/" className="mt-3">Back to Home</Button>
      </Container>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      user: "You",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: "" });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarFill key={i} className="text-warning me-1" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="text-warning me-1" />);
      } else {
        stars.push(<Star key={i} className="text-warning me-1" />);
      }
    }
    
    return <div className="d-flex">{stars}</div>;
  };

  return (
    <Container className="my-5">
      {/* Restaurant Header with Image */}
      <div className="position-relative mb-4">
        <img 
          src={data.image} 
          alt={data.name} 
          className="img-fluid rounded-3 w-100" 
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Button 
          variant="light" 
          className="position-absolute top-0 end-0 m-3 p-2 rounded-circle"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <HeartFill size={24} className="text-danger" />
          ) : (
            <Heart size={24} className="text-danger" />
          )}
        </Button>
        <div className="position-absolute bottom-0 start-0 p-3 text-white" style={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
          <h1 className="mb-0">{data.name}</h1>
          <div className="d-flex align-items-center">
            {renderStars(data.rating)}
            <span className="ms-2">{data.rating} ({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      <Row>
        {/* Restaurant Details */}
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="text-danger mb-3">About {data.name}</h3>
              <p className="lead">{data.description}</p>
              
              <div className="d-flex flex-wrap gap-4 my-4">
                <div className="d-flex align-items-center">
                  <GeoAlt size={20} className="text-danger me-2" />
                  <div>
                    <small className="text-muted">Location</small>
                    <p className="mb-0">{data.location}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <Calendar size={20} className="text-danger me-2" />
                  <div>
                    <small className="text-muted">Established</small>
                    <p className="mb-0">{data.established}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <Clock size={20} className="text-danger me-2" />
                  <div>
                    <small className="text-muted">Timing</small>
                    <p className="mb-0">{data.timing}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-danger">Specialties</h5>
                <div className="d-flex flex-wrap gap-2">
                  {data.special.split(", ").map((item, index) => (
                    <Badge key={index} bg="light" text="dark" className="fs-6 fw-normal border">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-danger">Price Range</h5>
                <p>{data.priceRange}</p>
              </div>
            </Card.Body>
          </Card>

          {/* Photo Gallery */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4 className="text-danger mb-3">Photo Gallery</h4>
              <Carousel indicators={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded"
                    src={data.image}
                    alt="Restaurant"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded"
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Restaurant Interior"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Info & Reviews */}
        <Col md={4}>
          {/* Order Info */}
          <Card className="mb-4 shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h4 className="text-danger mb-3">Order Information</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Time</span>
                <strong>{data.deliveryTime}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Minimum Order</span>
                <strong>₹200</strong>
              </div>
              <Button variant="danger" className="w-100 py-2">Order Now</Button>
              <Button variant="outline-danger" className="w-100 py-2 mt-2">View Menu</Button>
            </Card.Body>
          </Card>

          {/* Reviews Summary */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-danger mb-0">Reviews</h4>
                <div className="d-flex align-items-center">
                  {renderStars(data.rating)}
                  <span className="ms-2">{data.rating}</span>
                </div>
              </div>
              
              <div className="mb-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(r => Math.floor(r.rating) === star).length;
                  const percentage = (count / reviews.length) * 100;
                  
                  return (
                    <div key={star} className="d-flex align-items-center mb-2">
                      <span className="me-2">{star} <StarFill className="text-warning" /></span>
                      <div className="progress flex-grow-1" style={{ height: "8px" }}>
                        <div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{ width: `${percentage}%` }}
                          aria-valuenow={percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span className="ms-2 text-muted">{count}</span>
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h4 className="text-danger mb-3">Customer Reviews</h4>
          
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between">
                  <h5>{review.user}</h5>
                  <small className="text-muted">{review.date}</small>
                </div>
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="mb-0">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}

          {/* Add Review Form */}
          <div className="mt-4">
            <h5 className="text-danger">Write a Review</h5>
            <Form onSubmit={handleReviewSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Your Rating</Form.Label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarFill
                      key={star}
                      className="cursor-pointer me-1"
                      style={{ cursor: "pointer" }}
                      color={star <= newReview.rating ? "#ffc107" : "#e4e5e9"}
                      size={24}
                      onClick={() => setNewReview({...newReview, rating: star})}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                />
              </Form.Group>
              <Button variant="danger" type="submit">Submit Review</Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantAbout;