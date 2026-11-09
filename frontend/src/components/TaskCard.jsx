import React from "react";
import api from "../services/api";

// React.memo impede o card de re-renderizar se os dados da tarefa não mudaram
const TaskCard = React.memo(({ task, onTaskUpdated, onTaskDeleted }) => {
  
  const toggleStatus = async () => {
    // Correção de Strings: Alinhado estritamente com as chaves do App.js ("Em Andamento")
    let nextStatus = "Em andamento";
    if (task.status === "Em andamento") {
      nextStatus = "Concluída";
    } else if (task.status === "Concluída") {
      nextStatus = "Pendente";
    }

    try {
      const response = await api.put(`/tasks/${task.id}`, {
        ...task,
        status: nextStatus,
      });
      onTaskUpdated(response.data);
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      return;
    }
    try {
      await api.delete(`/tasks/${task.id}`);
      onTaskDeleted(task.id);
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  // Função auxiliar para renderizar cores personalizadas nas badges por status
  const getBadgeClass = (status) => {
    switch (status) {
      case "Concluída": return "bg-success";
      case "Em andamento": return "bg-warning text-dark";
      default: return "bg-danger";
    }
  };

  // Correção de Fuso Horário: Evita que a data apareça com um dia a menos na tela
  const formatDate = (dateString) => {
    if (!dateString) return "Sem data";
    // Divide os componentes da data ano-mês-dia para instanciar localmente sem desvio UTC
    const [year, month, day] = dateString.split('-');
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="card h-100 shadow-sm border-0 transition-card mt-3">
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5
              className="card-title fw-bold text-dark mb-0 text-truncate"
              style={{ maxWidth: "70%" }}
              title={task.title}
            >
              {task.title}
            </h5>
            <span className={`badge ${getBadgeClass(task.status)}`}>
              {task.status}
            </span>
          </div>

          <p className="card-text text-muted small mb-4 text-secondary text-break">
            {task.description || (
              <em className="text-black-50">Sem descrição informada.</em>
            )}
          </p>
        </div>

        <div>
          <div className="d-flex align-items-center mb-3 text-secondary small">
            <span className="me-1">📅</span>
            <span>
              Vence em: <strong>{formatDate(task.dueDate)}</strong>
            </span>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={toggleStatus}
              className="btn btn-outline-primary btn-sm flex-grow-1 fw-semibold"
            >
              🔄 Alternar Status
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger btn-sm fw-semibold"
              title="Excluir tarefa"
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TaskCard;
