import React from "react";
import { useState } from "react";

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validação do formulário
    if (!title) return alert("O título é obrigatório");

    // Criação do objeto de tarefa
    const newTask = { title, description, status, dueDate };
    onTaskCreated(newTask);

    // Limpeza do formulário
    setTitle("");
    setDescription("");
    setStatus("Pendente");
    setDueDate("");
  };

  return (
    <div className="card shadow-sm border-0 max-width-form mx-auto my-4">
      <div className="card-body p-4">
        <h4 className="card-title mb-4 fw-bold text-dark">✨ Nova Tarefa</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label fw-semibold text-secondary"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Digite o título da tarefa..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label fw-semibold text-secondary"
            >
              Descrição
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="3"
              placeholder="O que precisa ser feito?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label
                htmlFor="status"
                className="form-label fw-semibold text-secondary"
              >
                Status Inicial
              </label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pendente">⏳ Pendente</option>
                <option value="Em Progresso">🚀 Em Progresso</option>
                <option value="Concluída">✅ Concluída</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label
                htmlFor="dueDate"
                className="form-label fw-semibold text-secondary"
              >
                Data limite
              </label>
              <input
                type="date"
                id="dueDate"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold mt-2 shadow-sm"
          >
            Criar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
