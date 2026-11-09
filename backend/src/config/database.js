require("dotenv").config(); // OBRIGATÓRIO: Sempre na primeira linha do arquivo de configuração
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres", // Banco de dados
  process.env.DB_USER || "postgres", // Usuário
  process.env.DB_PASS || "admin", // Senha (ajustado para bater com o .env)
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres", // Deixe o dialeto fixo como string para evitar erros do Sequelize
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
);

module.exports = sequelize;

/*const { Sequelize } = require('sequelize');

// ATENÇÃO: Substitua as strings abaixo pelos seus dados reais do pgAdmin
const sequelize = new Sequelize(
  'postgres',          // Nome do banco de dados (deixe postgres que já existe)
  'postgres',          // Usuário padrão
  'postgres',    // DIGITE SUA SENHA REAL AQUI ENTRE AS ASPAS
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

module.exports = sequelize;*/
