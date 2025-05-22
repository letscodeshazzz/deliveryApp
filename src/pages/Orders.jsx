import React, { useState, useEffect } from 'react';
import { Container, Card, ProgressBar, Button, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MdDeliveryDining, 
  MdLocationPin, 
  MdTimer, 
  MdRestaurant, 
  MdPerson,
  MdDirectionsBike,
  MdCheckCircle,
  MdAccessTime
} from 'react-icons/md';
import { FaMotorcycle, FaMapMarkerAlt, FaStore } from 'react-icons/fa';

// Custom icons with better visuals
const deliveryBikeIcon = new L.Icon({
  iconUrl: 	'https://cdn-icons-png.flaticon.com/128/9561/9561839.png', // motorcycle
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const restaurantIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/9425/9425767.png', // restaurant
  iconSize: [35, 35],
  iconAnchor: [17, 17],
  popupAnchor: [0, -20],
});

const customerIcon = new L.Icon({
  iconUrl: '	https://cdn-icons-png.flaticon.com/128/10307/10307931.png', // customer/home
  iconSize: [35, 35],
  iconAnchor: [17, 17],
  popupAnchor: [0, -20],
});


// Helper functions
const getRandomStartPos = (baseLat, baseLng) => {
  const latOffset = (Math.random() - 0.5) * 0.005;
  const lngOffset = (Math.random() - 0.5) * 0.005;
  return [baseLat + latOffset, baseLng + lngOffset];
};

const calculateETA = (distance) => {
  const avgSpeed = 20; // km/h
  const timeInHours = distance / avgSpeed;
  return Math.ceil(timeInHours * 60); // minutes
};

// Smooth center pan
const SmoothPanTo = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center]);
  return null;
};

const DeliveryTracking = ({ orderId }) => {
  const deliveryStages = [
    { 
      id: 1, 
      name: 'Order Placed', 
      description: 'We received your order',
      // location: 'Burger Palace', 
      progress: 0, 
      icon: <FaStore className="text-danger" />,
      time: '2:45 PM'
    },
    { 
      id: 2, 
      name: 'Preparing Food', 
      description: 'Chef is cooking your meal',
      // location: 'Burger Palace', 
      progress: 25, 
      icon: <MdRestaurant className="text-danger"  />,
      time: '2:50 PM'
    },
    { 
      id: 3, 
      name: 'Food Ready', 
      description: 'Your food is packed and ready',
      // location: 'Burger Palace', 
      progress: 50, 
      icon: <MdCheckCircle className="text-warning" />,
      time: '3:05 PM'
    },
    { 
      id: 4, 
      name: 'On the Way', 
      description: 'Delivery partner is coming to you',
      location: 'In Transit', 
      progress: 75, 
      icon: <FaMotorcycle className="text-warning" />,
      time: '3:10 PM'
    },
    { 
      id: 5, 
      name: 'Delivered', 
      description: 'Enjoy your meal!',
      location: 'Your Location', 
      progress: 100, 
      icon: <MdPerson className="text-danger" />,
      time: '3:25 PM '
    },
  ];

  const restaurantPos = [28.6139, 77.2090];
  const customerPos = [28.6129, 77.2290];
  const [currentStage, setCurrentStage] = useState(0);
  const [driverPos, setDriverPos] = useState(restaurantPos);

  const [mapCenter, setMapCenter] = useState(driverPos);
  const [pathVisible, setPathVisible] = useState(false);
  const [eta, setEta] = useState('Calculating...');
  const [driverInfo] = useState({
    name: 'DeliveryBoy.',
    rating: '4.9',
    vehicle: 'DeliveryBike',
    plate: 'UP32 KE 3232',
    phone: '+91 98765 43210'
  });

  // Calculate initial ETA
  useEffect(() => {
    const distance = 2.5; // km - would normally calculate from coordinates
    setEta(`${calculateETA(distance)} min`);
  }, []);

  // Stage progression
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= deliveryStages.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Smooth movement
  useEffect(() => {
    if (currentStage === 3) {
      setPathVisible(true);
      const duration = 30000; // 30 seconds
      const steps = 100; // More steps = smoother
      const intervalTime = duration / steps;
    
      const [startLat, startLng] = restaurantPos;
      const [endLat, endLng] = customerPos;
    
      let step = 0;
      const animationInterval = setInterval(() => {
        step++;
        const lat = startLat + ((endLat - startLat) * step) / steps;
        const lng = startLng + ((endLng - startLng) * step) / steps;
    
        setDriverPos([lat, lng]);
        setMapCenter([lat, lng]);
    
        const progress = step / steps;
        const remainingDistance = 2.5 * (1 - progress);
        setEta(`${Math.max(1, Math.ceil(calculateETA(remainingDistance)))} min`);
    
        if (step >= steps) {
          clearInterval(animationInterval);
          setDriverPos(customerPos);
          setEta('Arrived');
        }
      }, intervalTime);
    
      return () => clearInterval(animationInterval);
    }
    

    if (currentStage >= 4) {
      setDriverPos(customerPos);
      setMapCenter(customerPos);
      setEta('Delivered');
    }
  }, [currentStage]);

  return (
    <Container className="my-4 delivery-tracking-container">
      <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
        <Card.Header className="bg-danger text-white py-3 rounded-top-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0 d-flex align-items-center">
              <MdDeliveryDining className="me-2" />
              <span className="fw-bold">Order #{orderId}</span>
            </h4>
            <Badge bg="light" text="primary" className="fs-6">
              {deliveryStages[currentStage].name}
            </Badge>
          </div>
        </Card.Header>
        
        <Card.Body>
          {/* Delivery Progress */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1 fw-bold">Delivery Status</h5>
                <p className="mb-0 text-muted">{deliveryStages[currentStage].description}</p>
              </div>
              <div className="text-end">
                <div className="d-flex align-items-center justify-content-end">
                  <MdTimer className="me-1 text-warning" size={20} />
                  <span className="fw-bold">{eta}</span>
                </div>
                <small className="text-muted">Estimated arrival</small>
              </div>
            </div>
            
            <ProgressBar now={deliveryStages[currentStage].progress}
              animated
              variant="warning"
              style={{ height: '10px' }}
              className="mb-2"
            />
            
            <div className="d-flex justify-content-between">
              {deliveryStages.map((stage, index) => (
                <div 
                  key={stage.id} 
                  className={`text-center ${index <= currentStage ? 'text-primary' : 'text-muted'}`}
                  style={{ width: `${100/deliveryStages.length}%` }}
                >
                  <div className={`stage-dot ${index <= currentStage ? 'active' : ''}`}>
                    {index <= currentStage ? <MdCheckCircle size={18} /> : stage.icon}
                  </div>
                  <small className="d-block">{stage.time}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Partner Info */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs="auto">
                  <div className="driver-avatar bg-primary text-white">
                    {driverInfo.name.charAt(0)}
                  </div>
                </Col>
                <Col>
                  <h6 className="mb-1 fw-bold">{driverInfo.name}</h6>
                  <div className="d-flex align-items-center mb-1">
                    <span className="badge bg-warning text-dark me-2">
                      {driverInfo.rating} ★
                    </span>
                    <small className="text-muted">
                      <FaMotorcycle className="me-1" />
                      {driverInfo.vehicle} ({driverInfo.plate})
                    </small>
                  </div>
                  <small className="text-muted">
                    <MdAccessTime className="me-1" />
                    On time record: 98%
                  </small>
                </Col>
                <Col xs="auto">

                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Map */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-bold">
                <FaMapMarkerAlt className="text-danger me-2" />
                Live Tracking
              </h5>
              <div className="text-muted">
                <small>Updated: Just now</small>
              </div>
            </div>
            
            <div className="rounded-4 overflow-hidden border border-2 border-warning position-relative" style={{ height: '300px' }}>
              {currentStage < 3 && (
                <div className="map-overlay d-flex align-items-center justify-content-center">
                  <div className="text-center p-3 bg-white rounded-3 shadow">
                    <Spinner animation="border" variant="warning" className="mb-2" />
                    <h6 className="mb-0">Waiting for rider to pick up your order</h6>
                  </div>
                </div>
              )}
              
              <MapContainer
                center={mapCenter}
                zoom={16}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <SmoothPanTo center={mapCenter} />
                <TileLayer
                  url="https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38"
                  attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                <Marker position={restaurantPos} icon={restaurantIcon}>
                  <Popup className="fw-bold">
                    <div className="d-flex align-items-center">
                      <FaStore className="me-2 text-danger" />
                      <div>
                        <strong>Burger Palace</strong>
                        <div className="text-muted">Pickup location</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
                
                <Marker position={customerPos} icon={customerIcon}>
                  <Popup className="fw-bold">
                    <div className="d-flex align-items-center">
                      <MdPerson className="me-2 text-primary" />
                      <div>
                        <strong>Your Location</strong>
                        <div className="text-muted">Delivery destination</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
                
                <Marker position={driverPos} icon={deliveryBikeIcon}>
                  <Popup className="fw-bold">
                    <div className="d-flex align-items-center">
                      <FaMotorcycle className="me-2 text-warning" />
                      <div>
                        <strong>Your Delivery Partner</strong>
                        <div className="text-muted">{driverInfo.name}</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>

                {/* Path with realistic curved route */}
                {pathVisible && (
  <Polyline
    positions={[restaurantPos, driverPos]}
    color="orange"
    weight={4}
    dashArray="8"
  />
)}

              </MapContainer>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-4">
            <h5 className="mb-3 fw-bold">
              <MdTimer className="text-warning me-2" />
              Delivery Updates
            </h5>
            
            <div className="timeline">
              {deliveryStages.map((stage, index) => (
                <div key={stage.id} className={`timeline-item ${index <= currentStage ? 'active' : ''}`}>
                  <div className="timeline-marker">
                    {index <= currentStage ? (
                      <div className="icon-wrapper bg-danger">
                        <MdCheckCircle className="text-white" />
                      </div>
                    ) : (
                      <div className="icon-wrapper">
                        {stage.icon}
                      </div>
                    )}
                  </div>
                  <div className="timeline-content">
                    <div className="d-flex justify-content-between">
                      <h6 className={`mb-1 fw-bold ${index <= currentStage ? 'text-dark' : 'text-muted'}`}>
                        {stage.name}
                      </h6>
                      <small className={index <= currentStage ? 'text-primary' : 'text-muted'}>
                        {stage.time}
                      </small>
                    </div>
                    <p className={`mb-1 small ${index <= currentStage ? 'text-dark' : 'text-muted'}`}>
                      {stage.description}
                    </p>
                    <div className="d-flex align-items-center">
                      <MdLocationPin className={`me-1 ${index <= currentStage ? 'text-primary' : 'text-muted'}`} />
                      <small className={index <= currentStage ? 'text-dark' : 'text-muted'}>
                        {stage.location}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <Button variant="outline-danger" className="fw-bold px-4 py-2 rounded-pill me-3">
              Contact Support
            </Button>
            <Button variant="outline-danger" className="fw-bold px-4 py-2 rounded-pill">
              Rate Your Delivery Partner
            </Button>
          </div>
        </Card.Body>
      </Card>

    
    </Container>
  );
};

export default DeliveryTracking;