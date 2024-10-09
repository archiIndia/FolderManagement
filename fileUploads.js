const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up storage location and file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // You can set the folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set file name
  },
});

const upload = multer({ storage: storage });

// Create an endpoint to handle file uploads
app.post('/upload-endpoint', upload.array('files'), (req, res) => {
  console.log(req.files); // Contains info about uploaded files
  res.send('Files uploaded successfully!');
});

// Serve static files from 'uploads' folder (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000');
// });
