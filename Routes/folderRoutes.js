const express = require('express');
const { createFolder, getFoldersWithFiles, deleteFolder, getFoldersMenu, updateFolder } = require('../Controllers/folderController');
const router = express.Router();

// Create a new folder
router.post('/', createFolder);
router.get('/',getFoldersMenu);
router.get('/:id',getFoldersWithFiles);
router.put('/:id',updateFolder);
router.delete('/:id', deleteFolder);

module.exports = router;
