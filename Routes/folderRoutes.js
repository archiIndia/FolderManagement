const express = require('express');
const { createFolder, getFoldersByUser, getFoldersWithFiles, deleteFolder } = require('../Controllers/folderController');
const router = express.Router();

// Create a new folder
router.post('/', createFolder);

router.get('/:id',getFoldersWithFiles);

// Get a specific folder by ID
// router.get('/:id', getFolderById);

router.delete('/:id', deleteFolder);

module.exports = router;
