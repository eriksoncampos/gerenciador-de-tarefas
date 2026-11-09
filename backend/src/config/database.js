require("dotenv").config();

const config = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  },
  // Configuração obrigatória para o banco de dados em produção no Render
  dialectOptions: process.env.NODE_ENV === "production" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
};

// Se houver uma URL completa fornecida pelo Render, o CLI pode usá-la em produção
if (process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
  config.url = process.env.DATABASE_URL;
}

// Exportação compatível com o Sequelize CLI e com instâncias manuais
module.exports = {
  development: config,
  production: config,
  test: config
};
