const Folder = require("../Models/folders");

const createFolder = async (req, res) => {
  try {
    const { name, userId, parentFolderId } = req.body;
    const newFolder = await Folder.create({ name, userId, parentFolderId });
    res.status(201).json(newFolder);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating folder", error: error.message });
  }
};

const getFoldersByUser = async (req, res) => {
  try {
    const folders = await Folder.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(folders);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching folders", error: error.message });
  }
};

const getParentFolders= async(req,res)=>{
  try{
    const parent_folders= await Folder.findAll({where:{parentFolderId: 0}});
    res.status(200).json(parent_folders);
  }
  catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching folders' });
  }
};

const getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findOne(req.params.id);
    if (!folder) return res.status(404).json({ message: "Folder not found" });
    res.status(200).json(folder);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching folder", error: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    // const folder = await Folder.findOne(req.params.id);
    // if (!folder) return res.status(404).json({ message: 'Folder not found' });
    // await folder.destroy();
    // res.status(204).json({ message: 'Folder deleted' });
    const del_id = req.params.id;
    const del_folder = await Folder.update(
      { status: "deleted" },
      { where: { id: del_id, status: "active" } }
    );
    res.status(202).json({messages: "Folder deleted Successfully"});
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting folder", error: error.message });
  }
};

module.exports = {
  createFolder,
  getFoldersByUser,
  getParentFolders,
  getFolderById,
  deleteFolder,
};
