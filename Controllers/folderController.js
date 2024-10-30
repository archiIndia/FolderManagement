const File = require("../Models/files.js");
const Folder = require("../Models/folders.js");
const { all } = require("../Routes/folderRoutes.js");

const createFolder = async (req, res) => {
  try {
    const userId = req.userId; // Get the userId from the verified token
    const { name, parentId } = req.body;
    const newFolder = await Folder.create({ name:name, userId:userId, parentFolderId:parentId });
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(400).json({ message: "Error creating folder", error: error.message });
  }
};

const getFoldersByUser = async (req, res) => {
  try {
    const userId = req.userId; // Get the userId from the verified token
    const folders = await Folder.findAll({
      where: { userId: userId },
    });
    res.status(200).json(folders);
  } catch (error) {
    res.status(400).json({ message: "Error fetching folders", error: error.message });
  }
};

const getFoldersWithFiles = async (req, res) => {
  try {
    const userId = req.userId; // Get the userId from the verified token
    const folder_id = req.params.id;
    if (folder_id === "root") {
      const parent_folders = await Folder.findAll({ where: {userId:userId, parentFolderId: null, status: "active" } });
      const root_files = await File.findAll({ where: {userId:userId, folderId: null, status: "active" } });
      res.status(200).json({ folders: parent_folders, files: root_files });
    } else {
      const folders = await Folder.findAll({ where: {userId:userId, parentFolderId: folder_id, status: "active" } });
      const files = await File.findAll({ where: {userId:userId, folderId: folder_id, status: "active" } });
      res.status(200).json({ folders: folders, files: files });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching folders" });
  }
};

const getFoldersMenu = async (req, res) => {
  try {
    const userId = req.userId; // Get the userId from the verified token
    const all_folders_raw = await Folder.findAll({where: {userId:userId}});
    const all_folders = all_folders_raw?.map((folder) => folder.toJSON());

    function buildTree(folders, parentFolderId = null) {
      const tree = [];
      folders
        .filter((folder) => folder.parentFolderId === parentFolderId)
        .forEach((folder) => {
          const children = buildTree(folders ?? [], folder.id);
          if (children.length) {
            folder.children = children;
          } 
          tree.push(folder);
        });
      return tree;
    }
    const response = buildTree(all_folders);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: "Error fetching folder", error: error.message });
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

const updateFolder= async(req,res)=>{
  try{
  console.log('Body',req.body);
  const parentFolderId= req?.body?.payload?.parentId;
  const folder_name= req?.body?.payload?.name;
  const folder_id= req?.body?.folderId;
    console.log('f_id',folder_id);
    console.log('f_name',folder_name);
  const update_folder= await Folder.update({name: folder_name},{where: {id:folder_id}});
  res.status(202).json(update_folder);
  }catch(error){
    res.status(400).json({ message: "Error updating folder", error: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const userId = req.userId; // Get the userId from the verified token
    const del_id = req.params.id;
    const del_folder = await Folder.update({ status: "deleted" }, { where: {userId:userId, id: del_id, status: "active" } });
    res.status(202).json({ messages: "Folder deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting folder", error: error.message });
  }
};

module.exports = {
  createFolder,
  getFoldersByUser,
  getFoldersWithFiles,
  getFoldersMenu,
  updateFolder,
  deleteFolder,
};
