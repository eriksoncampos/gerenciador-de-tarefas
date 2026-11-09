const User = require("./userModel");
const Task = require("./taskModel");

// Definindo o relacionamento 1 para N
User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
  onDelete: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = { User, Task };
