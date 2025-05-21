import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, ProgressBar, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MdDeliveryDining, MdLocationPin, MdTimer } from 'react-icons/md';

// Add this above your component or inside the component before return
const yellowBikeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  iconSize: [45, 45],         // adjust size as needed
  iconAnchor: [22, 22],       // point of the icon which will correspond to marker's location
  popupAnchor: [0, -20],      // point from which the popup should open relative to the iconAnchor
});

// Inside your MapContainer



// Randomize start point around restaurant
const getRandomStartPos = (baseLat, baseLng) => {
  const latOffset = (Math.random() - 0.5) * 0.03;
  const lngOffset = (Math.random() - 0.5) * 0.03;
  return [baseLat + latOffset, baseLng + lngOffset];
};

const SmoothPanTo = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center]);
  return null;
};

const DeliveryTracking = ({ orderId }) => {
  const deliveryStages = [
    { id: 1, name: 'Order Placed', location: 'Restaurant', progress: 0 },
    { id: 2, name: 'Preparing Food', location: 'Restaurant', progress: 25 },
    { id: 3, name: 'Food Ready', location: 'Restaurant', progress: 50 },
    { id: 4, name: 'On the Way', location: 'In Transit', progress: 75 },
    { id: 5, name: 'Delivered', location: 'Customer', progress: 100 },
  ];

  const restaurantPos = [28.6139, 77.2090];
  const customerPos = [28.6129, 77.2290];
  const [currentStage, setCurrentStage] = useState(0);
  const [driverPos, setDriverPos] = useState(getRandomStartPos(...restaurantPos));
  const [mapCenter, setMapCenter] = useState(driverPos);
  const [animationActive, setAnimationActive] = useState(false);

  // Track delivery stage
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

  // Bike animation logic
  useEffect(() => {
    if (currentStage === 3) {
      setAnimationActive(true);
      const duration = 16000; // 16 seconds animation
      const steps = 40;
      const intervalTime = duration / steps;
      const [startLat, startLng] = driverPos;
      const [endLat, endLng] = customerPos;

      let step = 0;
      const animationInterval = setInterval(() => {
        step++;
        const lat = startLat + ((endLat - startLat) * step) / steps;
        const lng = startLng + ((endLng - startLng) * step) / steps;
        setDriverPos([lat, lng]);
        setMapCenter([lat, lng]);
        if (step >= steps) {
          clearInterval(animationInterval);
          setAnimationActive(false);
          setDriverPos(customerPos);
        }
      }, intervalTime);

      return () => clearInterval(animationInterval);
    }

    if (currentStage >= 4) {
      setDriverPos(customerPos);
      setMapCenter(customerPos);
    }
  }, [currentStage]);

  return (
    <Container className="my-4">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-danger text-white py-3 rounded-top-4">
          <h4 className="mb-0 d-flex align-items-center">
            <MdDeliveryDining className="me-2 fs-4" />
            Order Tracking #{orderId}
          </h4>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <strong>Status</strong>
              <span>{deliveryStages[currentStage].name}</span>
            </div>
            <ProgressBar now={deliveryStages[currentStage].progress} animated variant="danger" />
          </div>

          {/* Delivery Timeline */}
          <div className="timeline mb-4">
            {deliveryStages.map((stage, index) => (
              <div key={stage.id} className={`timeline-item ${index <= currentStage ? 'active' : ''}`}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h6>{stage.name}</h6>
                  <p className="text-muted mb-1">
                    <MdLocationPin className="me-1" />
                    {stage.location}
                  </p>
                  <small className="text-muted">
                    <MdTimer className="me-1" />
                    {index <= currentStage ? 'Done' : 'Pending'}
                  </small>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="mb-3 rounded-3 overflow-hidden" style={{ height: '300px' }}>
            <MapContainer center={mapCenter} zoom={15} style={{ height: '100%', width: '100%' }}>
              <SmoothPanTo center={mapCenter} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={restaurantPos}><Popup>Restaurant</Popup></Marker>
              <Marker position={customerPos}><Popup>Customer</Popup></Marker>
              <Marker position={driverPos} icon={yellowBikeIcon}>
                <Popup>Delivery Partner</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="text-center">
            <Button variant="outline-danger" onClick={() => window.location.reload()}>
              Place Another Order
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Timeline Styles */}
      <style>
        {`
          .timeline {
            position: relative;
            padding-left: 30px;
          }
          .timeline-item {
            position: relative;
            padding-bottom: 20px;
          }
          .timeline-item:last-child {
            padding-bottom: 0;
          }
          .timeline-marker {
            position: absolute;
            left: -30px;
            top: 0;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: #ccc;
            border: 2px solid white;
          }
          .timeline-item.active .timeline-marker {
            background-color: #dc3545;
          }
          .timeline-item:not(:last-child)::after {
            content: '';
            position: absolute;
            left: -21px;
            top: 18px;
            height: calc(100% - 20px);
            width: 2px;
            background-color: #ccc;
          }
          .timeline-item.active:not(:last-child)::after {
            background-color: #dc3545;
          }
          .timeline-content {
            padding-left: 15px;
          }
        `}
      </style>
    </Container>
  );
};

// Example usage
const OrderPage = () => {
  return <DeliveryTracking orderId="FD987654321" />;
};

export default OrderPage;
