const express = require("express");
const bodyParser = require('body-parser');
const cors= require('cors');
const DB= require('./DBconnection.js');
// const multer= require('multer');
// const upload = multer({ dest: 'uploads/' });

require('dotenv').config();
const app = express()


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/users', require('./Routes/userRoutes.js'));
app.use('/folders', require('./Routes/folderRoutes.js'));
app.use('/files', require('./Routes/fileRoutes.js'));

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});