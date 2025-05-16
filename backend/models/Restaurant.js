import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  image: String,
  location: String,
  address: String,
  reason: String
});

export default mongoose.model("Restaurant", restaurantSchema);
