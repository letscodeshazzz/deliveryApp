import mongoose from 'mongoose';
import Restaurant from './models/Restaurant.js'; // Adjust paths if necessary
import MenuItem from './models/MenuItem.js'; // Adjust paths if necessary

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Sample data
const restaurants = [
  { name: "Paradise Biryani", cuisine: "Hyderabadi Biryani", image: "/images/food1.jpg", location: "Hyderabad", address: "Paradise Circle, Secunderabad, Hyderabad", reason: "Famous for its legendary Hyderabadi biryani." },
  { name: "Shadab Restaurant", cuisine: "Hyderabadi Non-Veg", image: "/images/food2.jpg", location: "Hyderabad", address: "Opp. Charminar, Hyderabad", reason: "Known for its rich Mughlai and Hyderabadi non-veg dishes." },
  { name: "Karim's", cuisine: "Mughlai", image: "/images/food3.jpg", location: "Delhi", address: "Old Delhi, Jama Masjid, Delhi", reason: "A centuries-old restaurant serving authentic Mughlai dishes." },
  { name: "Khan Chacha", cuisine: "North Indian", image: "/images/food4.jpg", location: "Delhi", address: "Khan Market, New Delhi", reason: "Famous for its kebabs and grilled dishes." },
  { name: "Shree Thaker Bhojanalay", cuisine: "Gujarati Thali", image: "/images/food5.jpg", location: "Mumbai", address: "Tardeo, Mumbai", reason: "Famous for its authentic Gujarati thali." },
  { name: "Sarvi Restaurant", cuisine: "Vegetarian", image: "/images/food6.jpg", location: "Mumbai", address: "Mohammad Ali Road, Mumbai", reason: "Known for its iconic vegetarian Pulao and other delectable dishes." },
  { name: "Tunday Kababi", cuisine: "Awadhi Non-Veg", image: "/images/food7.jpg", location: "Lucknow", address: "Mauza, Chowk, Lucknow", reason: "Famous for its mouthwatering Tunday Kebabs." },
  { name: "Idris Biryani", cuisine: "Awadhi Non-Veg", image: "/images/food8.jpg", location: "Lucknow", address: "Gulabrai Market, Lucknow", reason: "Known for its delectable mutton biryani." },
  { name: "Virat's Kitchen", cuisine: "North Indian", image: "/images/food9.jpg", location: "Bangalore", address: "Koramangala, Bangalore", reason: "Popular for North Indian and Tandoori dishes." },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Delete existing data
    await Restaurant.deleteMany();

    // Insert new restaurants
    const createdRestaurants = await Restaurant.insertMany(restaurants);

    console.log('Database seeded successfully with multiple restaurants!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

// Run the seed function
seedDatabase();
