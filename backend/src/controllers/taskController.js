const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = await taskService.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await taskService.update(req.params.id, req.body);
        res.json(task);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await taskService.delete(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
