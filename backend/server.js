import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import the routes
import restaurantRoutes from "./routes/restaurant.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
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
