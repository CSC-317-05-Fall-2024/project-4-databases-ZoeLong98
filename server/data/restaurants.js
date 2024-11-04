import { pool } from "../config/database.js";

// Get a list of restaurants
const getRestaurants = async () => {
  const results = await pool.query("SELECT * FROM restaurants");
  console.log(results.rows);
  return results.rows;
};

// Get a restaurant by id
const getRestaurant = async (id) => {
  const results = await pool.query("SELECT * FROM restaurants WHERE id = $1", [
    id,
  ]);
  console.log(results.rows);
  return results.rows[0];
};

// Get a list of reviews for a restaurant by id
const getReviewsForRestaurant = async (id) => {
  const results = await pool.query(
    "SELECT * FROM reviews WHERE restaurant_id = $1",
    [id]
  );
  return results.rows;
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
  const results = await pool.query(
    "INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      newRestaurant.name,
      newRestaurant.phone,
      newRestaurant.address,
      newRestaurant.photo,
    ]
  );
  return results.rows[0];
};

// Delete a restaurant by id
const deleteRestaurant = (id) => {
  const results = pool.query("DELETE FROM restaurants WHERE id = $1", [id]);
  return results.rows[0];
};

export {
  getRestaurants,
  getRestaurant,
  getReviewsForRestaurant,
  createRestaurant,
  deleteRestaurant,
};
