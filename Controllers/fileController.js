const File = require("../Models/files.js");
const path = require("path");

const uploadFile = (req, res) => {
  console.log("req", req.files);
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // Ensure the uploads folder exists and is accessible
  const uploadDir = path.join(__dirname, "../uploads");

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.my_file;
  // uploadPath = __dirname + "/somewhere/on/your/server/" + sampleFile.name;
  uploadPath = path.join(uploadDir, sampleFile?.name);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "File uploaded sucessfully!" });
  });
};

const getFilesByFolder = async (req, res) => {
  try {
    const files = await File.findAll({ where: { folderId: req.params.folderId } });
    res.status(200).json(files);
  } catch (error) {
    res.status(400).json({ message: "Error fetching files", error: error.message });
  }
};

const getFileById = async (req, res) => {
  try {
    const file = await File.findOne(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ message: "Error fetching file", error: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    await file.destroy();
    res.status(204).json({ message: "File deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting file", error: error.message });
  }
};

module.exports = { uploadFile, getFilesByFolder, getFileById, deleteFile };
