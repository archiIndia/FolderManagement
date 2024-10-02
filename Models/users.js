const { DataTypes,Sequelize,Model } = require('sequelize');
const { db_connection } = require('../DBconnection');

class User extends Model {}

User.init(
  {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    sequelize: db_connection,
    tableName: 'users'
}
);

// User.sync()
// .then(() => {
//   console.log('Database & tables created!');
// });

module.exports = User;

