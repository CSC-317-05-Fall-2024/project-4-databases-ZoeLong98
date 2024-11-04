import express from "express";
import {
  getRestaurants,
  getRestaurant,
  getReviewsForRestaurant,
  createRestaurant,
  deleteRestaurant,
} from "../data/restaurants.js";

const router = express.Router();

// Add routes here
router.post("/restaurants", async (req, res) => {
  const newRestaurant = req.body;
  try {
    await createRestaurant(newRestaurant);
    res.status(200).send({ message: "Restaurant created" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Failed to create restaurant" });
  }
});

router.delete("/restaurants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    deleteRestaurant(id);
    res.status(200).send({ message: "Restaurant deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Failed to delete restaurant" });
  }
});

router.get("/restaurants/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const restaurant = await getRestaurant(id);
    const reviews = await getReviewsForRestaurant(id);
    res.render("restaurant-details", { restaurant, reviews });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Failed to fetch restaurant details" });
  }
});

export { router as backendRouter };
