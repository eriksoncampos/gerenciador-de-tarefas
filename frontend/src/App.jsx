import React, { useState, useEffect, useMemo, useCallback } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import AuthForm from "./components/AuthForm";

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todas");

  // Correção de Segurança: Verifica se o usuário E o token existem antes de restaurar a sessão
  useEffect(() => {
    const storedUser = localStorage.getItem("@App:user");
    const storedToken = localStorage.getItem("@App:token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    } else {
      // Limpa dados órfãos caso um falte para evitar requisições 401 que quebrem o app
      handleLogout();
    }
  }, []);

  // Busca as tarefas apenas quando o usuário estiver validado e autenticado
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:user");
    setUser(null);
    setTasks([]);
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData);
      // Sintaxe funcional garante manipulação correta do estado mais recente
      setTasks((prevTasks) => [response.data, ...prevTasks]);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  // useCallback evita a recriação das funções a cada render do App.js
  const handleUpdateTask = useCallback((updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // useMemo: Realiza o cálculo de contagem de status em um único laço de repetição apenas se 'tasks' mudar
  const stats = useMemo(() => {
    const counts = { total: tasks.length, concluida: 0, pendente: 0, emAndamento: 0 };
    
    tasks.forEach((task) => {
      if (task.status === "Concluída") counts.concluida++;
      else if (task.status === "Pendente") counts.pendente++;
      else if (task.status === "Em andamento") counts.emAndamento++;
    });
    
    return counts;
  }, [tasks]);

  // useMemo: Filtra a lista de tarefas sem reprocessamento excessivo
  const filteredTasks = useMemo(() => {
    if (filter === "Todas") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  // Se o usuário não estiver autenticado, exibe a tela de Login / Cadastro
  if (!user) {
    return <AuthForm onLoginSuccess={(loggedUser) => setUser(loggedUser)} />;
  }

  return (
    <div className="container py-5">
      {/* Cabeçalho com informações do usuário e botão de logout */}
      <header className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <span className="text-muted">Conectado como: </span>
          <strong>{user.email}</strong>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <h1 className="card-title mb-4 fw-bold text-dark">Gerenciador de Tarefas</h1>

      <h2>
        <span className="badge bg-primary me-2">Total de tarefas: {stats.total}</span>
        <span className="badge bg-success me-2">Concluídas: {stats.concluida}</span>
        <span className="badge bg-danger me-2">Pendentes: {stats.pendente}</span>
        <span className="badge bg-warning text-dark">Em andamento: {stats.emAndamento}</span>
      </h2>

      {/* Barra de Botões de Filtro */}
      <div className="btn-group my-4" role="group" aria-label="Filtros de status">
        {["Todas", "Pendente", "Em andamento", "Concluída"].map((status) => {
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

      <div className="task-list mt-4">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando tarefas...</span>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="alert alert-light border mt-3" role="alert">
            Nenhuma tarefa cadastrada ainda.
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="alert alert-light border mt-3" role="alert">
            Nenhuma tarefa encontrada para o filtro <strong>{filter}</strong>.
          </div>
        ) : (
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
