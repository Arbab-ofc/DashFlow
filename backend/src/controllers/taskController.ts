import { NextFunction, Request, Response } from "express";
import { TaskStatus } from "@prisma/client";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from "../services/taskService";
import { successResponse } from "../utils/responses";

const getUserId = (req: Request): number => {
  const userId = req.user?.id;
  if (!userId) {
    const error = new Error("Unauthorized");
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }
  return userId;
};

export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const task = await createTask(userId, req.body);
    successResponse(res, task, "Task created", 201);
  } catch (error) {
    next(error);
  }
};

export const getTasksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { status, search, page, limit } = req.query;

    const parsedStatus =
      status && typeof status === "string"
        ? (status.toUpperCase() as TaskStatus)
        : undefined;

    const filters = {
      status:
        parsedStatus === TaskStatus.PENDING || parsedStatus === TaskStatus.COMPLETED
          ? parsedStatus
          : undefined,
      search: typeof search === "string" ? search : undefined,
      page: typeof page === "string" ? Number(page) : undefined,
      limit: typeof limit === "string" ? Number(limit) : undefined
    };

    const result = await getTasks(userId, filters);
    successResponse(res, result, "Tasks fetched");
  } catch (error) {
    next(error);
  }
};

export const getTaskByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      const error = new Error("Invalid task id");
      (error as Error & { statusCode?: number }).statusCode = 400;
      throw error;
    }

    const task = await getTaskById(userId, id);
    successResponse(res, task, "Task fetched");
  } catch (error) {
    next(error);
  }
};

export const updateTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      const error = new Error("Invalid task id");
      (error as Error & { statusCode?: number }).statusCode = 400;
      throw error;
    }

    const task = await updateTask(userId, id, req.body);
    successResponse(res, task, "Task updated");
  } catch (error) {
    next(error);
  }
};

export const deleteTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      const error = new Error("Invalid task id");
      (error as Error & { statusCode?: number }).statusCode = 400;
      throw error;
    }

    await deleteTask(userId, id);
    successResponse(res, { id }, "Task deleted");
  } catch (error) {
    next(error);
  }
};
