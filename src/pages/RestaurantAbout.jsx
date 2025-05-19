import React from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const restaurantDetails = {
  1: {
    name: "The Mughal's Dastarkhwan",
    description: "The Mughal's Dastarkhwan is known for its rich, aromatic Mughlai cuisine. Serving Lucknow’s food lovers since 1995.",
    location: "Hazratganj, Lucknow",
    established: 1995,
    special: "Mutton Biryani, Butter Chicken",
  },
  2: {
    name: "Home Sweet Home",
    description: "A cozy place delivering homely meals and snacks with a modern twist. Ideal for casual dining and family outings.",
    location: "Alambagh, Lucknow",
    established: 2010,
    special: "Paneer Pizza, Burgers, Fries",
  },
  3: {
    name: "Tunday Kebab",
    description: "Tunday Kababi is legendary for its melt-in-the-mouth Galawati Kebabs, prepared from a centuries-old secret recipe.",
    location: "Aminabad, Lucknow",
    established: 1905,
    special: "Tunday Kebab, Mughlai Paratha",
  },
 
};

const RestaurantAbout = () => {
  const { id } = useParams();
  const data = restaurantDetails[id];

  if (!data) {
    return (
      <Container className="mt-5">
        <h3 className="text-danger">Restaurant details not found.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-danger mb-3">{data.name}</h2>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Established:</strong> {data.established}</p>
        <p><strong>Special Dishes:</strong> {data.special}</p>
      </Card>
    </Container>
  );
};

export default RestaurantAbout;
