import { useEffect, useState } from "react";

export default function TaskModal({ open, onClose, onSubmit, initialTask }) {
  const isEdit = Boolean(initialTask?.id);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (!open) return;

    if (initialTask) {
      setTitle(initialTask.title ?? "");
      setStatus(initialTask.status ?? "todo");
      setPriority(initialTask.priority ?? "medium");
    } else {
      setTitle("");
      setStatus("todo");
      setPriority("medium");
    }
  }, [open, initialTask]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      id: initialTask?.id,
      title,
      status,
      priority
    });
  }

  return (
    <div style={overlay} onMouseDown={onClose}>
      <div style={modal} onMouseDown={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Editar tarefa" : "Nova tarefa"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={input}
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
          />

          <select style={input} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>

          <select style={input} value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button type="submit">{isEdit ? "Salvar alterações" : "Salvar"}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modal = {
  background: "#111",
  padding: 20,
  borderRadius: 6,
  width: 360,
  border: "1px solid #222"
};

const input = {
  width: "100%",
  padding: 8,
  marginTop: 8,
  background: "#1f1f1f",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: 4
};

