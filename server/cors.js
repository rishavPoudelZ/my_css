const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get allowed origins from environment variable and split them into an array
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };

  module.exports = corsOptions;