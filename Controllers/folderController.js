const File = require("../Models/files.js");
const Folder = require("../Models/folders.js");

const createFolder = async (req, res) => {
  try {
    const { name, userId, parentFolderId } = req.body;
    const newFolder = await Folder.create({ name, userId, parentFolderId });
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(400).json({ message: "Error creating folder", error: error.message });
  }
};

const getFoldersByUser = async (req, res) => {
  try {
    const folders = await Folder.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(folders);
  } catch (error) {
    res.status(400).json({ message: "Error fetching folders", error: error.message });
  }
};

const getFoldersWithFiles = async (req, res) => {
  try {
    const folder_id = req.params.id;
    console.log("folder_id", req.params.id);
    if (folder_id === "root") {
      const parent_folders = await Folder.findAll({ where: { parentFolderId: null,status: 'active' }});
      const root_files = await File.findAll({where: {folderId: null,status: 'active'}});
      res.status(200).json({folders:parent_folders, files:root_files}); 
    } else {
      const folders = await Folder.findAll({ where: { parentFolderId: folder_id,status: 'active' }});
      const files = await File.findAll({where: {folderId: folder_id,status: 'active'}});
      res.status(200).json({folders:folders, files:files});
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching folders" });
  }
};

// const getFolderById = async (req, res) => {
//   try {
//     const folder = await Folder.findOne(req.params.id);
//     if (!folder) return res.status(404).json({ message: "Folder not found" });
//     res.status(200).json(folder);
//   } catch (error) {
//     res.status(400).json({ message: "Error fetching folder", error: error.message });
//   }
// };

const deleteFolder = async (req, res) => {
  try {
    // const folder = await Folder.findOne(req.params.id);
    // if (!folder) return res.status(404).json({ message: 'Folder not found' });
    // await folder.destroy();
    // res.status(204).json({ message: 'Folder deleted' });
    const del_id = req.params.id;
    const del_folder = await Folder.update({ status: "deleted" }, { where: { id: del_id, status: "active" } });
    res.status(202).json({ messages: "Folder deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting folder", error: error.message });
  }
};

module.exports = {
  createFolder,
  getFoldersByUser,
  getFoldersWithFiles,
  deleteFolder,
};
