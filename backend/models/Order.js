import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      restaurantName: String 
    },
  ],
  totalAmount: Number,
  restaurantName: String, 
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);

