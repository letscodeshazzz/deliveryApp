import React, { useEffect, useState } from "react";


import { 
  Container, 
  Form, 
  Button, 
  Card, 
  Alert, 
  Row, 
  Col,
  Image,
  InputGroup,
  FormControl,
  Badge,
  Modal,
  Spinner
} from "react-bootstrap";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaHome, 
  FaMapMarkerAlt, 
  FaEdit,
  FaCamera,
  FaUtensils,
  FaAllergies
} from "react-icons/fa";
import { MdDeliveryDining, MdFastfood } from "react-icons/md";
import { GiMeal } from "react-icons/gi";

const Profile = () => {
  const email = localStorage.getItem("email");
  
  // Default profile data
  const defaultProfile = {
    name: "",
    email: email || "",
    phone: "",
    profilePhoto: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      floor: "",
      flat: "",
      deliveryInstructions: ""
    },
    preferences: {
      dietaryRestrictions: [],
      favoriteCuisines: [],
      spiceLevel: "medium",
      deliveryNotes: ""
    }
  };

  const [user, setUser] = useState(defaultProfile);
  const [message, setMessage] = useState({ text: "", variant: "success" });
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [tempPhoto, setTempPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem(`userProfile_${email}`);
      if (savedProfile) {
        setUser(JSON.parse(savedProfile));
      } else {
      
        localStorage.setItem(`userProfile_${email}`, JSON.stringify(defaultProfile));
      }
      setIsLoading(false);
    };

    if (email) {
      loadProfile();
    }
  }, [email]);


  useEffect(() => {
    if (!isLoading && email) {
      localStorage.setItem(`userProfile_${email}`, JSON.stringify(user));
    }
  }, [user, email, isLoading]);

  const handleSave = () => {
    try {
      setMessage({ text: "Profile saved successfully!", variant: "success" });
      setIsEditing(false);

    } catch (error) {
      setMessage({ text: "Failed to save profile", variant: "danger" });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result);
        setShowPhotoModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const savePhoto = () => {
    const updatedUser = { ...user, profilePhoto: tempPhoto };
    setUser(updatedUser);
    setShowPhotoModal(false);
  };

  const dietaryOptions = [
    { value: "vegetarian", label: "Vegetarian", icon: <GiMeal /> },
    { value: "vegan", label: "Vegan", icon: <GiMeal /> },
    { value: "glutenFree", label: "Gluten-Free", icon: <FaAllergies /> },
    { value: "dairyFree", label: "Dairy-Free", icon: <FaAllergies /> },
    { value: "nutFree", label: "Nut-Free", icon: <FaAllergies /> },
    { value: "halal", label: "Halal", icon: <FaUtensils /> },
    { value: "kosher", label: "Kosher", icon: <FaUtensils /> }
  ];

  const cuisineOptions = [
    { value: "italian", label: "Italian", icon: <MdFastfood /> },
    { value: "chinese", label: "Chinese", icon: <MdFastfood /> },
    { value: "indian", label: "Indian", icon: <MdFastfood /> },
    { value: "mexican", label: "Mexican", icon: <MdFastfood /> },
    { value: "japanese", label: "Japanese", icon: <MdFastfood /> },
    { value: "thai", label: "Thai", icon: <MdFastfood /> },
    { value: "mediterranean", label: "Mediterranean", icon: <MdFastfood /> }
  ];

  const spiceLevels = [
    { value: "mild", label: "Mild" },
    { value: "medium", label: "Medium" },
    { value: "hot", label: "Hot" },
    { value: "extraHot", label: "Extra Hot" }
  ];

  const togglePreference = (type, value) => {
    const current = user.preferences[type];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        [type]: updated
      }
    };
    
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <div style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    // padding: "20px 0",
    margin: 0,
    minHeight: "100vh",// ensures no top spacing
    
    }}>
      <Container className="my-5 profile-page">
        <style>
          {`
            .transparent-card {
              background-color: rgba(255, 255, 255, 0.85) !important;
              backdrop-filter: blur(8px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .transparent-card .card-header {
              background-color: rgba(255, 255, 255, 0.5) !important;
            }
            .profile-header {
              position: relative;
              overflow: hidden;
            }
            .profile-content {
              position: relative;
              z-index: 1;
            }
            .profile-photo-container {
              position: relative;
              display: inline-block;
              transition: all 0.3s ease;
            }
            .profile-photo-container:hover {
              transform: scale(1.05);
            }
            .profile-photo-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: white;
              opacity: 0;
              transition: opacity 0.3s;
            }
            .profile-photo-container:hover .profile-photo-overlay {
              opacity: 1;
            }
            .pref-btn {
              transition: all 0.2s ease;
            }
            .pref-btn:hover {
              transform: translateY(-2px);
            }
            .form-control, .input-group-text {
              background-color: rgba(255, 255, 255, 0.7) !important;
            }
          `}
        </style>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-lg overflow-hidden transparent-card">
              <div className="profile-header text-white p-4">
                <div className="profile-content">
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <div className="position-relative">
                        <div 
                          className="profile-photo-container"
                          onClick={() => isEditing && document.getElementById('profilePhotoUpload').click()}
                          style={{ cursor: isEditing ? 'pointer' : 'default' }}
                        >
                          <Image 
                            src={user.profilePhoto || "https://randomuser.me/api/portraits/men/1.jpg"} 
                            roundedCircle 
                            width={150} 
                            height={150}
                            className="border-4 border-white object-fit-cover shadow"
                          />
                          {isEditing && (
                            <div className="profile-photo-overlay">
                              <FaCamera size={32} />
                              <span className="mt-2">Change Photo</span>
                            </div>
                          )}
                        </div>
                        <input 
                          id="profilePhotoUpload"
                          type="file" 
                          accept="image/*" 
                          onChange={handlePhotoChange} 
                          className="d-none" 
                        />
                      </div>
                    </Col>
                    <Col>
                      <h2 className="mb-2 fw-bold text-danger">{user.name || "Your Name"}</h2>
                      <p className="mb-2 d-flex align-items-center text-danger">
                        <FaEnvelope className="me-2 fs-5" />
                        {user.email}
                      </p>
                      <p className="mb-2 d-flex align-items-center text-danger">
                        <FaPhone className="me-2 fs-5" />
                        {user.phone || "Not provided"}
                      </p>
                      <div className="d-flex gap-2 flex-wrap">
                        <Badge bg="light" text="dark" className="d-flex align-items-center fs-6">
                          <MdDeliveryDining className="me-1 fs-5" />
                          Premium Member
                        </Badge>
                        <Badge bg="light" text="dark" className="fs-6">
                          Foodjet User
                        </Badge>
                      </div>
                    </Col>
                    <Col xs="auto">
                      {isEditing ? (
                        <div className="d-flex gap-2">
                          <Button variant="outline-danger" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button variant="outline-warning" onClick={handleSave}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline-danger" onClick={() => setIsEditing(true)}>
                          <FaEdit className="me-2" />Edit Profile
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>

              {message.text && (
                <Alert variant={message.variant} className="m-4 mb-0">
                  {message.text}
                </Alert>
              )}

              <div className="p-4">
                <Row>
                  <Col md={6}>
                    <Card className="mb-4 shadow-sm border-0 transparent-card">
                      <Card.Header className="border-0">
                        <h5 className="mb-0 d-flex align-items-center text-danger">
                          <FaUser className="me-2 fs-4" />
                          Personal Information
                        </h5>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                            disabled={!isEditing}
                            className="py-2"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={user.email}
                            disabled
                            className="py-2"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Phone Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>+91</InputGroup.Text>
                            <FormControl
                              type="tel"
                              name="phone"
                              value={user.phone}
                              onChange={(e) => setUser({...user, phone: e.target.value})}
                              disabled={!isEditing}
                              placeholder="(91) 456-7890"
                              className="py-2"
                            />
                          </InputGroup>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="mb-4 shadow-sm border-0 transparent-card">
                      <Card.Header className="border-0">
                        <h5 className="mb-0 d-flex align-items-center text-danger">
                          <FaHome className="me-2 fs-4" />
                          Delivery Address
                        </h5>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Street Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.street"
                            value={user.address.street}
                            onChange={(e) => setUser({...user, address: {...user.address, street: e.target.value}})}
                            disabled={!isEditing}
                            className="py-2"
                          />
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-medium">City</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.city"
                                value={user.address.city}
                                onChange={(e) => setUser({...user, address: {...user.address, city: e.target.value}})}
                                disabled={!isEditing}
                                className="py-2"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-medium">State/Province</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.state"
                                value={user.address.state}
                                onChange={(e) => setUser({...user, address: {...user.address, state: e.target.value}})}
                                disabled={!isEditing}
                                className="py-2"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-medium">Postal Code</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.postalCode"
                                value={user.address.postalCode}
                                onChange={(e) => setUser({...user, address: {...user.address, postalCode: e.target.value}})}
                                disabled={!isEditing}
                                className="py-2"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-medium">Country</Form.Label>
                              <Form.Control
                                as="select"
                                name="address.country"
                                value={user.address.country}
                                onChange={(e) => setUser({...user, address: {...user.address, country: e.target.value}})}
                                disabled={!isEditing}
                                className="py-2"
                              >
                                <option>India</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                                <option>Australia</option>
                                <option>Other</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-medium">Flat/Apartment #</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.flat"
                                value={user.address.flat}
                                onChange={(e) => setUser({...user, address: {...user.address, flat: e.target.value}})}
                                disabled={!isEditing}
                                className="py-2"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-medium">Floor</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.floor"
                                value={user.address.floor}
                                onChange={(e) => setUser({...user, address: {...user.address, floor: e.target.value}})}
                                disabled={!isEditing}
                                className="py-2"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Delivery Instructions</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="address.deliveryInstructions"
                            value={user.address.deliveryInstructions}
                            onChange={(e) => setUser({...user, address: {...user.address, deliveryInstructions: e.target.value}})}
                            disabled={!isEditing}
                            placeholder="Gate code, building instructions, etc."
                            className="py-2"
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="shadow-sm border-0 transparent-card">
                  <Card.Header className="border-0">
                    <h5 className="mb-0 d-flex align-items-center text-danger">
                      <FaUtensils className="me-2 fs-4" />
                      Food Preferences
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <h6 className="mb-3 fw-medium">Dietary Restrictions</h6>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                          {dietaryOptions.map(option => (
                            <Button
                              key={option.value}
                              variant={
                                user.preferences.dietaryRestrictions.includes(option.value) 
                                  ? "danger" 
                                  : "outline-danger"
                              }
                              className="d-flex align-items-center pref-btn"
                              size="sm"
                              onClick={() => isEditing && togglePreference("dietaryRestrictions", option.value)}
                              disabled={!isEditing}
                            >
                              <span className="me-2">{option.icon}</span>
                              {option.label}
                            </Button>
                          ))}
                        </div>
                      </Col>
                      <Col md={6}>
                        <h6 className="mb-3 fw-medium">Favorite Cuisines</h6>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                          {cuisineOptions.map(option => (
                            <Button
                              key={option.value}
                              variant={
                                user.preferences.favoriteCuisines.includes(option.value) 
                                  ? "warning" 
                                  : "outline-warning"
                              }
                              className="d-flex align-items-center pref-btn"
                              size="sm"
                              onClick={() => isEditing && togglePreference("favoriteCuisines", option.value)}
                              disabled={!isEditing}
                            >
                              <span className="me-2">{option.icon}</span>
                              {option.label}
                            </Button>
                          ))}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Preferred Spice Level</Form.Label>
                          <div className="d-flex gap-2 flex-wrap">
                            {spiceLevels.map(level => (
                              <Button
                                key={level.value}
                                variant={
                                  user.preferences.spiceLevel === level.value
                                    ? "danger"
                                    : "outline-danger"
                                }
                                size="sm"
                                className="pref-btn"
                                onClick={() => isEditing && setUser({
                                  ...user,
                                  preferences: {
                                    ...user.preferences,
                                    spiceLevel: level.value
                                  }
                                })}
                                disabled={!isEditing}
                              >
                                {level.label}
                              </Button>
                            ))}
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Additional Delivery Notes</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="preferences.deliveryNotes"
                            value={user.preferences.deliveryNotes}
                            onChange={(e) => setUser({...user, preferences: {...user.preferences, deliveryNotes: e.target.value}})}
                            disabled={!isEditing}
                            placeholder="Special requests, allergies to mention, etc."
                            className="py-2"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </Card>
          </Col>
        </Row>

        <Modal show={showPhotoModal} onHide={() => setShowPhotoModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Preview Profile Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <Image 
              src={tempPhoto} 
              roundedCircle 
              width={200} 
              height={200}
              className="border border-4 border-danger mb-3 object-fit-cover shadow"
            />
            <p>Does this look good?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPhotoModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={savePhoto}>
              Save Photo
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Profile;