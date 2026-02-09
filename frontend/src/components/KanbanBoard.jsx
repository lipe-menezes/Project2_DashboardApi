import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function KanbanBoard({ tasks, onEdit, onMove }) {
  const columns = [
    { key: "todo", title: "Todo" },
    { key: "doing", title: "Doing" },
    { key: "done", title: "Done" }
  ];

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Se soltou no mesmo lugar, não faz nada
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const toStatus = destination.droppableId;
    const fromStatus = source.droppableId;

    // se mudou de coluna, atualiza status no backend
    if (toStatus !== fromStatus) {
      onMove?.(draggableId, toStatus);
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);

          return (
            <Droppable droppableId={col.key} key={col.key}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    ...column,
                    outline: snapshot.isDraggingOver ? "2px solid #444" : "none"
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>{col.title}</h3>

                  {colTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...card,
                            opacity: snapshot.isDragging ? 0.85 : 1,
                            ...provided.draggableProps.style
                          }}
                        >
                          <button style={cardTitleBtn} onClick={() => onEdit(task)}>
                            {task.title}
                          </button>

                          <div style={{ fontSize: 12, opacity: 0.7 }}>
                            prioridade: {task.priority}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

const column = {
  flex: 1,
  background: "#111",
  padding: 12,
  borderRadius: 6,
  minHeight: 220,
  border: "1px solid #222"
};

const card = {
  background: "#1f1f1f",
  padding: 10,
  borderRadius: 6,
  marginBottom: 8,
  border: "1px solid #2a2a2a"
};

const cardTitleBtn = {
  background: "transparent",
  color: "#fff",
  border: "none",
  padding: 0,
  cursor: "pointer",
  textAlign: "left",
  fontWeight: 700,
  fontSize: 16,
  textDecoration: "underline"
};


