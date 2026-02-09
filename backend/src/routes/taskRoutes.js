import { Router } from "express";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = Router();

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Lista tarefas com filtros, busca e paginação
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [todo, doing, done] }
 *       - in: query
 *         name: priority
 *         schema: { type: string, enum: [low, medium, high] }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Lista paginada
 *
 *   post:
 *     summary: Cria uma tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, example: "Estudar Node" }
 *               description: { type: string, example: "API com Express" }
 *               status: { type: string, enum: [todo, doing, done] }
 *               priority: { type: string, enum: [low, medium, high] }
 *     responses:
 *       201:
 *         description: Criada
 *
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [todo, doing, done] }
 *               priority: { type: string, enum: [low, medium, high] }
 *     responses:
 *       200:
 *         description: Atualizada
 *
 *   delete:
 *     summary: Remove uma tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Removida
 */


router.get("/", listTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

