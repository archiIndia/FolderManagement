const { DataTypes, Sequelize, Model } = require("sequelize");
const User = require("./users");
const { db_connection } = require("../DBconnection");

class Folder extends Model {}

Folder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
    parentFolderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Folder, // Self-referencing key
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("active", "deleted"),
      default: "active",
    },
  },
  {
    timestamps: true,
    tableName: "folders",
    sequelize: db_connection,
  }
);

// Folder.belongsTo(User, { foreignKey: "userId" });
// Folder.hasMany(Folder, { as: "subFolders", foreignKey: "parentFolderId" });

// Folder.sync().then(() => {
//   console.log("Database & tables created!");
// });

module.exports = Folder;
