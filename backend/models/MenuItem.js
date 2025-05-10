import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  name: String,
  price: Number,
});

export default mongoose.model("MenuItem", menuItemSchema);
