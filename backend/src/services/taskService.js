const Task = require('../models/taskModel');

class TaskService {
    async getAll() {return await Task.findAll();}
    async create(data) {return await Task.create(data);}
    async getById(id) {return await Task.findByPk(id);}
    async update(id, data) {
        const task = await Task.findByPk(id);
        if (!task) throw new Error('Task not found');
        await task.update(data);
        return task;
    }
    async delete(id) {
        const task = await Task.findByPk(id);
        if (!task) throw new Error('Task not found');
        await task.destroy();
        return task;
    }
}

module.exports = new TaskService();