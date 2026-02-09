export default function TaskTable({ tasks, onDelete, onEdit }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={th}>Título</th>
          <th style={th}>Status</th>
          <th style={th}>Prioridade</th>
          <th style={th}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td style={td}>
              <button style={titleBtn} onClick={() => onEdit(task)}>
                {task.title}
              </button>
            </td>
            <td style={td}>{task.status}</td>
            <td style={td}>{task.priority}</td>
            <td style={td}>
              <button style={btnDanger} onClick={() => onDelete(task.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "1px solid #444",
  padding: "8px"
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #333"
};

const titleBtn = {
  background: "transparent",
  color: "#fff",
  border: "none",
  padding: 0,
  cursor: "pointer",
  textDecoration: "underline",
  fontWeight: 600
};

const btnDanger = {
  background: "#b91c1c",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
  borderRadius: 6
};

