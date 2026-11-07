import React, { useState, useEffect } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Novo estado para controlar o filtro selecionado ('Todas', 'Pendente', 'Em Andamento', 'Concluída')
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
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

  // 2. Lógica de filtragem com base no estado atual
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Todas") return true;
    return task.status === filter;
  });

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

      {/* 3. Barra de Botões de Filtro */}
      <div
        className="btn-group mb-4"
        role="group"
        aria-label="Filtros de status"
      >
        {["Todas", "Pendente", "Em Andamento", "Concluída"].map((status) => {
          const isActive = filter === status;
          return (
            <button
              key={status}
              type="button"
              className={`btn ${isActive ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          );
        })}
      </div>

      <TaskForm onTaskCreated={handleCreateTask} />
      <div className="task-list">
        {loading ? (
          <p className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando tarefas...</span>
          </p>
        ) : tasks.length === 0 ? (
          // 4. Tratamento de Empty State amigável considerando o filtro
          <div className="alert alert-light border mt-3" role="alert">
            Nenhuma tarefa encontrada para o filtro <strong>{filter}</strong>.
          </div>
        ) : (
          // 5. Mapeando a lista filtrada em vez da lista completa
          filteredTasks.map((task) => (
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
