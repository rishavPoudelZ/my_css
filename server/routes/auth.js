const express = require("express");
const router = express.Router();
const {
  hashPassword,
  comparePassword,
  generateAccessToken,
} = require("../middlewares/authenticate");
const pool = require("../utils/db");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });
  }
  try {
    const response = await pool.query(
      `SELECT * from users where username='${username}'`
    );
    if (response.rowCount == 0) {
      try {
        const passwordHash = await hashPassword(password);
        const query =
          "INSERT INTO users (username, user_email, password) VALUES ($1, $2, $3)";
        const values = [username, email, passwordHash];
        await pool.query(query, values);
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res.status(409).json({ message: "Username already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const response = await pool.query(
        `SELECT * from users where username='${username}'`
      );
      if (response.rowCount == 1) {
        const user = response.rows[0];
        const passwordMatch = await comparePassword(password, user.password);
        if (passwordMatch) {
          const accessToken = generateAccessToken(user);
          res
            .status(200)
            .json({ message: "Login Sucessfull", token: accessToken });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
