const express = require('express');
const { uploadFile, deleteFile, getFilesByFolderId, getFileById } = require('../Controllers/fileController');
const router = express.Router();

// Upload a new file
router.post('/', uploadFile);

// Get all files in a specific folder
router.get('/folder/:folderId', getFilesByFolderId);

// Get a specific file by ID
router.get('/:id',getFileById );

// Delete a file by ID
router.delete('/:id', deleteFile);

module.exports = router;
