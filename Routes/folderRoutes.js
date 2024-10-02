const express = require('express');
const { createFolder, getFoldersByUser, getFolderById, deleteFolder, getParentFolders } = require('../Controllers/folderController');
const router = express.Router();

// Create a new folder
router.post('/', createFolder);

router.get('/parent/0', getParentFolders);

// Get a specific folder by ID
router.get('/:id', getFolderById);

router.delete('/:id', deleteFolder);

module.exports = router;
