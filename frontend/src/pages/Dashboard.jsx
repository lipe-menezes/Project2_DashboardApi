import { useEffect, useState } from "react";
import { getTasks, deleteTask, createTask, updateTask } from "../api/tasks";
import TaskTable from "../components/TaskTable";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";
import toast from "react-hot-toast";


export default function Dashboard() {
  const [view, setView] = useState("list");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);


  // filtros
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [result, setResult] = useState({
    page: 1,
    limit: 50,
    total: 0,
    data: []
  });

  function handleEdit(task) {
  setSelectedTask(task);
  setOpenModal(true);
}


async function load(custom = {}) {
  try {
    setLoading(true);

    const params = {
      page: 1,
      limit: 50,
      ...(q ? { q } : {}),
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(priorityFilter ? { priority: priorityFilter } : {}),
      ...custom
    };

    const r = await getTasks(params);
    setResult(r);
  } catch {
    toast.error("Erro ao carregar tarefas");
  } finally {
    setLoading(false);
  }
}


  // carrega inicial
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // recarrega quando filtros mudarem (debounce)
  useEffect(() => {
    const t = setTimeout(() => load(), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, statusFilter, priorityFilter]);

async function handleDelete(id) {
  const ok = window.confirm("Tem certeza que deseja excluir esta tarefa?");
  if (!ok) return;

  try {
    await deleteTask(id);
    toast.success("Tarefa excluída");
    load();
  } catch {
    toast.error("Erro ao excluir tarefa");
  }
}


async function handleSubmitModal(payload) {
  try {
    if (payload.id) {
      await updateTask(payload.id, {
        title: payload.title,
        status: payload.status,
        priority: payload.priority
      });
      toast.success("Tarefa atualizada");
    } else {
      await createTask({
        title: payload.title,
        status: payload.status,
        priority: payload.priority
      });
      toast.success("Tarefa criada");
    }

    setOpenModal(false);
    setSelectedTask(null);
    load();
  } catch {
    toast.error("Erro ao salvar tarefa");
  }
}


async function handleMove(taskId, newStatus) {
  try {
    await updateTask(taskId, { status: newStatus });
    toast.success("Status atualizado");
    load();
  } catch {
    toast.error("Erro ao mover tarefa");
  }
}


  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard de Tarefas</h1>

      <button
        onClick={() => {
          setSelectedTask(null);
          setOpenModal(true);
        }}
        style={{ marginBottom: 12 }}
      >
        + Nova tarefa
      </button>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          placeholder="Buscar (título/descrição)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 8, minWidth: 240 }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">Status (todos)</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">Prioridade (todas)</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={() => {
            setQ("");
            setStatusFilter("");
            setPriorityFilter("");
          }}
        >
          Limpar
        </button>
      </div>

      {/* View switch */}
      <div style={{ margin: "12px 0" }}>
        <button onClick={() => setView("list")} style={{ marginRight: 8 }}>
          Lista
        </button>
        <button onClick={() => setView("kanban")}>Kanban</button>
      </div>

      <p>Total: {result.total}</p>

{loading && <p>Carregando...</p>}

{!loading && view === "list" && (
  <TaskTable tasks={result.data} onDelete={handleDelete} onEdit={handleEdit} />
)}

{!loading && view === "kanban" && (
  <KanbanBoard tasks={result.data} onEdit={handleEdit} onMove={handleMove} />
)}


      <TaskModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSubmitModal}
        initialTask={selectedTask}
      />
    </div>
  );
}


