import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import restaurantRoutes from "./routes/restaurant.js";
import orderRoutes from "./routes/order.js";

dotenv.config();
const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: "http://localhost:5173",  // React frontend dev server
  credentials: true
}));

app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API running ✅");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch(err => console.error("❌ MongoDB connection error:", err));
