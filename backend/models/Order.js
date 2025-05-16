import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      restaurantName: String // ✅ optional, if you want per item
    },
  ],
  totalAmount: Number,
  restaurantName: String, // ✅ this is what you want
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

