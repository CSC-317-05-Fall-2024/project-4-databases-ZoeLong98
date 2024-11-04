// Add your server code here.
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getRestaurants,
  getRestaurant,
  getReviewsForRestaurant,
  createRestaurant,
  deleteRestaurant,
} from "./data/restaurants.js";
import { backendRouter } from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// todo: set up view engine for ejs template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/restaurants", async (req, res) => {
  const restaurantData = await getRestaurants();
  res.render("restaurants", { restaurantData });
});
app.get("/attractions", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "attractions.html"));
});
app.get("/newRestaurant", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "newRestaurant.html"));
});

app.get("/restaurants/:id", async (req, res) => {
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

// mount the router with /api prefix
app.use(express.json());
app.use("/api", backendRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
