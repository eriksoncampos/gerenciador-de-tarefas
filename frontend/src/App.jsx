import React, { useState, useEffect } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container py-5">
      <h1 className="card-title mb-4 fw-bold text-dark">
        Gerenciador de Tarefas
      </h1>
      <h2>
        <span className="badge bg-primary">
          Total de tarefas: {tasks.length}
        </span>
        <span className="badge bg-success">
          Concluídas:{" "}
          {tasks.filter((task) => task.status === "Concluída").length}
        </span>
        <span className="badge bg-danger">
          Pendentes: {tasks.filter((task) => task.status === "Pendente").length}
        </span>
        <span className="badge bg-warning">
          Em Andamento:{" "}
          {tasks.filter((task) => task.status === "Em Andamento").length}
        </span>
      </h2>
      <TaskForm onTaskCreated={handleCreateTask} />
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskUpdated={handleUpdateTask}
              onTaskDeleted={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
