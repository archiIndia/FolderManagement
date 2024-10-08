const User = require('./users.js');
const Folder = require('./folders.js');
const File = require('./files.cjs');

// User to Folders
User.hasMany(Folder, { foreignKey: 'userId' });
Folder.belongsTo(User, { foreignKey: 'userId' });

// User to Files
User.hasMany(File, { foreignKey: 'userId' });
File.belongsTo(User, { foreignKey: 'userId' });

// Folder to Files
Folder.hasMany(File, { foreignKey: 'folderId' });
File.belongsTo(Folder, { foreignKey: 'folderId' });

// Folder to Subfolders (Self-Referencing)
Folder.hasMany(Folder, { as: 'Subfolders', foreignKey: 'parentFolderId' });
Folder.belongsTo(Folder, { as: 'ParentFolder', foreignKey: 'parentFolderId' });

