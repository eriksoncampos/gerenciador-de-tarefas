const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Em andamento', 'Concluída'),
    defaultValue: 'Pendente'
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
});

module.exports = Task;