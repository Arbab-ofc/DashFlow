import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { createTask, deleteTask, getTasks, updateTask } from "../services/taskService";
import { PaginatedTasks, Task, TaskFilters, TaskStatus } from "../types";

const DEFAULT_LIMIT = 12;

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<Omit<PaginatedTasks, "tasks">>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0
  });
  const [status, setStatus] = useState<TaskStatus | undefined>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo<TaskFilters>(
    () => ({
      status,
      search: search.trim() || undefined,
      page: meta.page,
      limit: meta.limit
    }),
    [status, search, meta.page, meta.limit]
  );

  const fetchTasks = useCallback(async (nextFilters: TaskFilters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getTasks(nextFilters);
      setTasks(response.tasks);
      setMeta({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages
      });
    } catch (err) {
      setError("Unable to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, fetchTasks]);

  const createTaskItem = async (data: {
    title: string;
    description?: string;
    status?: TaskStatus;
  }) => {
    await createTask(data);
    toast.success("Task created");
    await fetchTasks(filters);
  };

  const updateTaskItem = async (id: number, data: Partial<Task>) => {
    await updateTask(id, data);
    toast.success("Task updated");
    await fetchTasks(filters);
  };

  const deleteTaskItem = async (id: number) => {
    await deleteTask(id);
    toast.success("Task deleted");
    await fetchTasks(filters);
  };

  const setStatusFilter = (nextStatus?: TaskStatus) => {
    setMeta((prev) => ({ ...prev, page: 1 }));
    setStatus(nextStatus);
  };

  const setSearchTerm = (value: string) => {
    setMeta((prev) => ({ ...prev, page: 1 }));
    setSearch(value);
  };

  const setPage = (page: number) => {
    setMeta((prev) => ({ ...prev, page }));
  };

  return {
    tasks,
    meta,
    filters,
    loading,
    error,
    search,
    status,
    fetchTasks,
    createTaskItem,
    updateTaskItem,
    deleteTaskItem,
    setStatusFilter,
    setSearchTerm,
    setPage
  };
};
