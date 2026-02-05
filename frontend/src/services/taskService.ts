import api from "./api";
import { PaginatedTasks, Task, TaskFilters, TaskStatus } from "../types";

export const getTasks = async (filters: TaskFilters): Promise<PaginatedTasks> => {
  const response = await api.get("/tasks", { params: filters });
  return response.data.data;
};

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
  status?: TaskStatus;
}): Promise<Task> => {
  const response = await api.post("/tasks", data);
  return response.data.data;
};

export const updateTask = async (
  id: number,
  data: { title?: string; description?: string | null; status?: TaskStatus }
): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
