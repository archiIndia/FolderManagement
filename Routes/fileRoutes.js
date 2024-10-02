const express = require('express');
const { uploadFile, getFilesByFolder, getFileById, deleteFile } = require('../Controllers/fileController');
const router = express.Router();

// Upload a new file
router.post('/', uploadFile);

// Get all files in a specific folder
router.get('/folder/:folderId', getFilesByFolder);

// Get a specific file by ID
router.get('/:id', getFileById);

// Delete a file by ID
router.delete('/:id', deleteFile);

module.exports = router;
