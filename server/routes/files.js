const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");
const multer = require("multer");
const { authenticateToken } = require("../middlewares/authenticate");
const pool = require("../utils/db");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Decode the base64 JSON key
const serviceAccountJson = Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64, 'base64').toString('utf8');

// Parse the JSON string to an object
const serviceAccount = JSON.parse(serviceAccountJson);



// Configure Google Cloud Storage
const storage = new Storage({
  credentials: serviceAccount,
  projectId: process.env.GCLOUD_PROJECT_ID,
});

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
const bucket = storage.bucket(bucketName);

// Set up Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload endpoint
router.post(
  "/upload",
  authenticateToken,
  upload.fields([
    { name: "htmlFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const currentDate = new Date().toISOString();
      const userId = req.user.user_id;

      if (!req.files.htmlFile || !req.files.imageFile) {
        return res.status(400).send("No files uploaded.");
      }

      // Function to upload a file to Google Cloud Storage
      const uploadFileToGCS = async (file, destination) => {
        const blob = bucket.file(destination);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        return new Promise((resolve, reject) => {
          blobStream.on("error", (err) => {
            reject(err);
          });

          blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
          });

          blobStream.end(file.buffer);
        });
      };

      // Upload HTML and Image files
      const htmlFilePath =
        "html/" + Date.now() + path.extname(req.files.htmlFile[0].originalname);
      const imageFilePath =
        "image/" +
        Date.now() +
        path.extname(req.files.imageFile[0].originalname);

      const [htmlFileUrl, imageFileUrl] = await Promise.all([
        uploadFileToGCS(req.files.htmlFile[0], htmlFilePath),
        uploadFileToGCS(req.files.imageFile[0], imageFilePath),
      ]);

      // Insert data into the database
      const query =
        "INSERT INTO projects (user_id, title, description, html_file, image_file, date_uploaded) VALUES ($1, $2, $3, $4, $5, $6)";
      const values = [
        userId,
        title,
        description,
        htmlFileUrl,
        imageFileUrl,
        currentDate,
      ];

      pool.query(query, values, (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({
          message: "Files and data uploaded successfully",
          htmlfile: req.files.htmlFile[0].originalname,
          imagefile: req.files.imageFile[0].originalname,
          title,
          description,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete endpoint
router.delete("/project/:projectId", authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const user_id = req.user.user_id;

  // First, retrieve the filenames from the database
  const getFilesQuery =
    "SELECT html_file, image_file FROM projects WHERE project_id=$1 AND user_id=$2";
  const deleteQuery = "DELETE FROM projects WHERE project_id=$1 AND user_id=$2";
  const values = [projectId, user_id];

  try {
    const result = await pool.query(getFilesQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    const { html_file, image_file } = result.rows[0];

    // Extract the file paths from the URLs
    const htmlFilePath = html_file.split(
      `https://storage.googleapis.com/${bucketName}/`
    )[1];
    const imageFilePath = image_file.split(
      `https://storage.googleapis.com/${bucketName}/`
    )[1];

    // Delete the files from Google Cloud Storage
    await Promise.all([
      bucket.file(htmlFilePath).delete(),
      bucket.file(imageFilePath).delete(),
    ]);

    // Delete the project record from the database
    await pool.query(deleteQuery, values);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
