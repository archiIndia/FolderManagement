const { DataTypes,Model } = require('sequelize');
const { db_connection } = require('../DBconnection.js');

class User extends Model {}

User.init(
  {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
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

