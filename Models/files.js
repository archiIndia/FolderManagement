const { DataTypes, Model } = require("sequelize");
const User = require("./users.js");
const Folder = require("./folders.js");
const { db_connection } = require("../DBconnection.js");

class File extends Model {}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filepath: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    filesize: {
      type: DataTypes.INTEGER, // Assuming filesize will be stored in bytes
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Folder,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("active", "deleted"),
      defaultValue: "active",
    },
  },
  {
    sequelize: db_connection,
    tableName: "files",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['filename', 'folderId']
      }
    ],
  }
);

File.belongsTo(User, { foreignKey: "userId" });
File.belongsTo(Folder, { foreignKey: "folderId" });

// File.sync()
// .then(() => {
//   console.log('Database & tables created!');
// });

module.exports = File;
