const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authenticate");
const pool = require("../utils/db");

router.get("/user", authenticateToken, async (req, res) => {
  const query = `SELECT * from users where user_id=$1`;
  const values = [req.user.user_id];
  const response = await pool.query(query, values);
  res.status(200).json(response.rows[0]);
});

router.get("/userLinks/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const query =
      "SELECT linkedin_url, github_url, username from users where user_id=$1";
    const values = [userId];
    const response = await pool.query(query, values);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/userLinks", authenticateToken, async (req, res) => {
  const { linkedin_url, github_url } = req.body;
  const query =
    "UPDATE users SET linkedin_url=$1, github_url=$2 where user_id=$3";
  const values = [linkedin_url, github_url, req.user.user_id];
  try {
    const response = pool.query(query, values);
    res.status(200).json({ message: "User links updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
