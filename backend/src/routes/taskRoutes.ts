import { Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  updateTaskHandler
} from "../controllers/taskController";
import { requireAuth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validation";
import { createTaskSchema, updateTaskSchema } from "../validators/taskValidator";

const router = Router();

router.use(requireAuth);

router.post("/", validateRequest(createTaskSchema), createTaskHandler);
router.get("/", getTasksHandler);
router.get("/:id", getTaskByIdHandler);
router.put("/:id", validateRequest(updateTaskSchema), updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;
