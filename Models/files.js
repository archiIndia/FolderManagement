const { DataTypes,Sequelize,Model } = require('sequelize');
const User = require('./users');
const Folder = require('./folders');
const { db_connection } = require('../DBconnection');

class File extends Model {}

File.init(
  {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  folderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Folder,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM("active", "deleted"),
    default: "active",
  },
}, {
  sequelize: db_connection,
  tableName: 'files',
  timestamps: true
});

File.belongsTo(User, { foreignKey: 'userId' });
File.belongsTo(Folder, { foreignKey: 'folderId' });

// File.sync()
// .then(() => {
//   console.log('Database & tables created!');
// });

module.exports = File;