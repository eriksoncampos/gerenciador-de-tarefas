const taskService = require("../services/taskService");

exports.getTasks = async (req, res) => {
  try {
    // Garante que o usuário só visualize as SUAS próprias tarefas
    const tasks = await taskService.getAll(req.user);
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getById(req.params.id, req.user);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada." });
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, status, description, dueDate } = req.body;

    // Vincula a tarefa diretamente ao ID do usuário logado
    const newTask = await taskService.create({
      title,
      status,
      description,
      dueDate,
      userId: req.user, // Aqui está o ID do usuário logado
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar tarefa." });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.update(req.params.id,req.user, req.body);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.delete(req.params.id,req.user);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
