const express = require("express");
const bodyParser = require('body-parser');
const cors= require('cors');
const DB= require('./DBconnection');
require('dotenv').config();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/folders', require('./Routes/folderRoutes'));
app.use('/api/files', require('./Routes/fileRoutes'));

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred!', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});