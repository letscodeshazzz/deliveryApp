import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import the routes
import restaurantRoutes from "./routes/restaurant.js";

dotenv.config();
const app = express();

// Middleware
const corsOptions = {
  origin: [
    'http://152.58.156.220:3000',  // Mobile public IP address with port 3000
    'http://localhost:3000',        // Local development (frontend)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Restaurant Routes
app.use("/api/restaurants", restaurantRoutes);

// Test route to check if server is running
app.get("/", (req, res) => {
  res.send("API running ✅");
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
