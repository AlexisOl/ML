const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log({
    dbName: process.env.NOMBRE_DB,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.PASSWORD_DB,
    dbHost: process.env.HOST,
  });
const sequelize = new Sequelize(process.env.NOMBRE_DB, process.env.DB_USER,process.env.PASSWORD_DB, {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false, 
});

module.exports = sequelize;
