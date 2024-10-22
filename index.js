const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors= require('cors');
const DB= require('./DBconnection.js');
const fileUpload = require("express-fileupload");
const path = require("path");

require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(fileUpload());

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Apply to protected routes
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});


// Routes
app.use('/users', require('./Routes/userRoutes.js'));
app.use('/folders', require('./Routes/folderRoutes.js'));
app.use('/files', require('./Routes/fileRoutes.js'));

// Serve static files from 'uploads' folder (optional)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({ message: 'An error occurred!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});