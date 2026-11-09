const { Sequelize } = require("sequelize");
require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = require("../config/database.js")[env];

// Instancia o banco usando a URL (produção) ou credenciais (local)
const sequelize = config.url 
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
