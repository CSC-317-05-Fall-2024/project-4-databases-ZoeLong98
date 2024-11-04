/* Initialize the data in the DB */
import { pool } from "./database.js";

const dropTables = async () => {
  try {
    console.log("dropping tables...");
    const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
    await pool.query(dropTablesQuery);
  } catch (error) {
    console.log(error);
  }
};

const createTables = async () => {
  try {
    console.log("creating restaurants...");
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS restaurants (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        photo TEXT
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        rating INTEGER NOT NULL,
        content TEXT,
        restaurant_id INTEGER NOT NULL,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      );
    `;
    await pool.query(createTablesQuery);
  } catch (error) {
    console.log(error);
  }
};

const insertData = async () => {
  try {
    console.log("adding initial data...");
    const insertQuery = `
    INSERT INTO restaurants (name, phone, address, photo) VALUES
      ('Aura Lounge & Jazz Bar', '+86 21 2020 1717', 'No.8 Century Avenue 52/F', 'images/aura-lounge-night-view.jpg');
    
    INSERT INTO restaurants (name, phone, address, photo) VALUES
      ('ROOF', '+86 21 5368 9537', '199 East Nanjing Road 29/F', 'images/roof.jpg');
    
    INSERT INTO restaurants (name, phone, address, photo) VALUES
      ('YONE', '+86 21 5368 9531', '1199 Nanjing Road East, 27F', 'images/yone.jpg');
    `;
    await pool.query(insertQuery);

    const insertReviewsQuery = `
      INSERT INTO reviews (rating, content, restaurant_id) VALUES
        (5, 'Fantastic place with great ambiance and live jazz music.', 1),
        (4, 'Stunning rooftop view and delicious cocktails.', 2),
        (3, 'Nice atmosphere but the food was a bit overpriced.', 3),
        (4, 'Great service and cozy environment.', 1),
        (5, 'Perfect spot for a romantic dinner.', 2),
        (2, 'The food was average and the service was slow.', 3);
    `;
    await pool.query(insertReviewsQuery);
  } catch (error) {
    console.log(error);
  }
};

const setup = async () => {
  await dropTables();
  await createTables();
  await insertData();
};

setup();
