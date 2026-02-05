import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import taskRoutes from "./taskRoutes";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

router.use("/auth", authRoutes);
router.use("/", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
