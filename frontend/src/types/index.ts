export type TaskStatus = "PENDING" | "COMPLETED";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaginatedTasks {
  tasks: Task[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TaskFilters {
  status?: TaskStatus;
  search?: string;
  page?: number;
  limit?: number;
}
