const { where } = require("sequelize");
const File = require("../Models/files.js");
const path = require("path");

const uploadFile = async (req, res) => {
  try {
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

    const folderId = req.body.folderId;
    console.log("folderId", folderId);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      // Save file details to the database
      const newFile = await File.create({
        filename: sampleFile.name,
        filepath: uploadPath,
        filesize: sampleFile.size,
        mimetype: sampleFile.mimetype,
        folderId: folderId,
        userId: 1,
      });
      res.status(200).json({
        message: "File uploaded and saved successfully!",
        file: newFile, // Return the saved file details
      });
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Internal server error");
  }
};

const getFilesByFolderId = async (req, res) => {
  try {
    const files = await File.findAll({ where: { folderId: req.params.folderId } });
    res.status(200).json(files);
  } catch (error) {
    res.status(400).json({ message: "Error fetching files", error: error.message });
  }
};

// const getFilesByRoot = async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const file = await File.findAll({ where: {folderId: null , status: "active" } });
//     if (!file) return res.status(404).json({ message: "File not found" });
//     res.status(200).json(file);
//   } catch (error) {
//     res.status(400).json({ message: "Error fetching file", error: error.message });
//   }
// };

const getFileById = async (req, res) => {
  try {
    const file_id = req.params.id;
    const file = await File.findOne({ where: { id: file_id } });
    const filePath = file.filepath; // Use the path saved in your database
    const fileName = file.filename; // Use the filename to serve the file

    // Sending the file to the client
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.log("Error in file download:", err);
        res.status(500).send({ message: "Could not download the file" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
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

module.exports = { uploadFile, getFilesByFolderId, getFileById, deleteFile };
