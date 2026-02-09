import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000"
});

export async function getTasks(params = {}) {
  const { data } = await api.get("/tasks", { params });
  return data; // { page, limit, total, data }
}

export async function createTask(payload) {
  const { data } = await api.post("/tasks", payload);
  return data;
}

export async function updateTask(id, payload) {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}
