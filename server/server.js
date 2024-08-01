const express = require('express');
const cors = require('cors');
const path = require('path');
const csp = require('helmet-csp');
const corsOptions = require('./cors');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'" , 'https://my-css.onrender.com'],
      styleSrc: ["'self'", "'unsafe-inline'" , 'https://my-css.onrender.com'],
      imgSrc: ["'self'", "data:" , 'https://my-css.onrender.com'],
      connectSrc: ["'self'" , 'https://my-css.onrender.com'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'" , 'https://my-css.onrender.com'],
    },
  })
);

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/files');

app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', userRoutes);
app.use('/files', uploadRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
