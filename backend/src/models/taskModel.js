const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pendente", "Em andamento", "Concluída"),
      defaultValue: "Pendente",
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    // Chave estrangeira que referencia o usuário
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Defina como true temporariamente se já houver dados antigos no banco
      field: "userId", // Força o Sequelize a usar exatamente "userId" no PostgreSQL
      references: {
        model: "users", // Nome da tabela de usuários
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
    underscored: true
  },
);

module.exports = Task;
