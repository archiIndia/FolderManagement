const { Sequelize } = require('sequelize');
require('dotenv').config();
// Option 1: Passing a connection URI

// Option 3: Passing parameters separately (other dialects)
const db_connection = new Sequelize('home_project', 'root', process.env.SECRET, {
  host: 'localhost',
  dialect: 'mysql',
  port:3306,  
});

db_connection.authenticate();
  console.log('Connection has been established successfully.');

  module.exports= {db_connection}