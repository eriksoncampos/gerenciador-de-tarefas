require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importa os models já com as associações configuradas
require("./models");

//Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Inicialização segura do Banco de Dados e do Servidor
async function startServer() {
  try {
    // 1. Testa se as credenciais estão certas
    await sequelize.authenticate();
    console.log("Conexão com o PostgreSQL estabelecida com sucesso!");

    // 2. Sincroniza os modelos (cria as tabelas se não existirem)
    await sequelize.sync({ force: false }); // force: false impede que seus dados sejam apagados ao reiniciar
    console.log("Modelos sincronizados com o banco de dados.");

    // 3. Inicia o servidor apenas após o banco estar pronto
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro crítico ao iniciar o servidor:", error);
    process.exit(1); // Fecha a aplicação caso não consiga conectar ao banco
  }
}

startServer();
