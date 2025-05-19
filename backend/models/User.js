// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String, // optional
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
