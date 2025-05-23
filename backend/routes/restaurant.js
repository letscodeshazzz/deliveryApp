
import express from "express";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id/menu", async (req, res) => {
  try {
    const menu = await MenuItem.find({ restaurantId: req.params.id });
    res.json(menu); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

