import { prisma } from "../lib/prisma.js";

const ALLOWED_STATUS = new Set(["todo", "doing", "done"]);
const ALLOWED_PRIORITY = new Set(["low", "medium", "high"]);

export async function listTasks(req, res) {
  try {
    const { status, priority, q } = req.query;

    // paginação
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 50);
    const skip = (page - 1) * limit;

    if (status && !ALLOWED_STATUS.has(String(status))) {
      return res.status(400).json({ error: "status inválido: todo|doing|done" });
    }

    if (priority && !ALLOWED_PRIORITY.has(String(priority))) {
      return res.status(400).json({ error: "priority inválida: low|medium|high" });
    }

    const where = {
      AND: [
        status ? { status: String(status) } : {},
        priority ? { priority: String(priority) } : {},
        q
          ? {
              OR: [
                { title: { contains: String(q) } },
                { description: { contains: String(q) } }
              ]
            }
          : {}
      ]
    };

    const [total, data] = await Promise.all([
      prisma.task.count({ where }),
      prisma.task.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit
      })
    ]);

    res.json({ page, limit, total, data });
  } catch {
    res.status(500).json({ error: "Erro ao listar tarefas" });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || String(title).trim().length < 3) {
      return res.status(400).json({ error: "Título inválido (mínimo 3 caracteres)" });
    }

    if (status && !ALLOWED_STATUS.has(String(status))) {
      return res.status(400).json({ error: "status inválido: todo|doing|done" });
    }

    if (priority && !ALLOWED_PRIORITY.has(String(priority))) {
      return res.status(400).json({ error: "priority inválida: low|medium|high" });
    }

    const task = await prisma.task.create({
      data: {
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        status: status || "todo",
        priority: priority || "medium"
      }
    });

    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const data = {};

    if (title !== undefined) {
      if (!title || String(title).trim().length < 3) {
        return res.status(400).json({ error: "Título inválido (mínimo 3 caracteres)" });
      }
      data.title = String(title).trim();
    }

    if (description !== undefined) {
      data.description = description ? String(description).trim() : null;
    }

    if (status !== undefined) {
      if (!ALLOWED_STATUS.has(String(status))) {
        return res.status(400).json({ error: "status inválido: todo|doing|done" });
      }
      data.status = String(status);
    }

    if (priority !== undefined) {
      if (!ALLOWED_PRIORITY.has(String(priority))) {
        return res.status(400).json({ error: "priority inválida: low|medium|high" });
      }
      data.priority = String(priority);
    }

    const updated = await prisma.task.update({
      where: { id },
      data
    });

    res.json(updated);
  } catch {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id }
    });

    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
}



