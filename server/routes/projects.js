const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const pool = require("../utils/db");
const path = require("path");
const fs = require("fs").promises;

router.get("/projects", async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const query = `
        SELECT * FROM projects
        ORDER BY date_uploaded DESC
        LIMIT $1 OFFSET $2
      `;
    const values = [limit, offset];
    const response = await pool.query(query, values);

    const countQuery = "SELECT COUNT(*) FROM projects";
    const countResult = await pool.query(countQuery);
    const totalItems = parseInt(countResult.rows[0].count, 10);

    res.json({
      projects: response.rows,
      totalItems,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/projects/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const query =
      "SELECT * from projects where user_id=$1 order by date_uploaded desc";
    const values = [userId];
    const response = await pool.query(query, values);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/project/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const query =
      "SELECT username, projects.user_id, html_file, image_file, title, description, date_uploaded, project_id from projects INNER JOIN users on users.user_id=projects.user_id where project_id=$1";
    const values = [projectId];
    const response = await pool.query(query, values);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
