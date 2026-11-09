const Task = require("../models/taskModel");

class TaskService {
  async getAll(userId) {
    return await Task.findAll({ where: { userId } });
  }
  async create(data) {
    return await Task.create(data);
  }
  async getById(id, userId) {
    return await Task.findOne({ where: { id, userId } });
  }
  async update(id, userId, data) {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) throw new Error("Tarefa não encontrada.");
    await task.update(data);
    return task;
  }
  async delete(id, userId) {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) throw new Error("Tarefa não encontrada.");
    await task.destroy();
    return task;
  }
}

module.exports = new TaskService();
