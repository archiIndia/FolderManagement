const File = require('../Models/files.js');

const uploadFile = async (req, res) => {
  try {
    const { name, fileType, size, userId, folderId } = req.body;
    const newFile = await File.create({ name, fileType, size, userId, folderId });
    res.status(201).json(newFile);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading file', error: error.message });
  }
};

const getFilesByFolder = async (req, res) => {
  try {
    const files = await File.findAll({ where: { folderId: req.params.folderId } });
    res.status(200).json(files);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching files', error: error.message });
  }
};

const getFileById = async (req, res) => {
  try {
    const file = await File.findOne(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching file', error: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    await file.destroy();
    res.status(204).json({ message: 'File deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting file', error: error.message });
  }
};

module.exports = { uploadFile, getFilesByFolder, getFileById, deleteFile };
