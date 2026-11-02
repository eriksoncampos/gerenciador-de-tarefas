import React from "react";
import api from "../services/api";

export default function TaskCard({ task, onTaskUpdated, onTaskDeleted }) {
  const toggleStatus = async () => {
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

  return (
    <div className="card h-100 shadow-sm border-0 transition-card">
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5
              className="card-title fw-bold text-dark mb-0 text-truncate"
              style={{ maxWidth: "70%" }}
            >
              {task.title}
            </h5>
            <span className="badge bg-secondary text-white">
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
              Vence em:{" "}
              <strong>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("pt-BR")
                  : "Sem data"}
              </strong>
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
}
