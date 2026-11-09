const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const protect = require("../middlewares/authMiddleware");

// Todas as rotas de tarefas são protegidas, exigindo autenticação
router.use(protect);

router.route("/").get(taskController.getTasks).post(taskController.createTask);
router
  .route("/:id")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
