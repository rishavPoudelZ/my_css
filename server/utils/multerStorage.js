const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "htmlFile") {
      const uniqueFilename = Date.now() + path.extname(file.originalname);
      req.html_file = uniqueFilename;
      file.uniqueFilename = uniqueFilename;
      cb(null, path.join(__dirname, "assets/html"));
    } else if (file.fieldname === "imageFile") {
      const uniqueFilename = Date.now() + path.extname(file.originalname);
      req.image_file = uniqueFilename;
      file.uniqueFilename = uniqueFilename;
      cb(null, path.join(__dirname, "assets/image"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.uniqueFilename);
  },
});

module.exports = storage;
