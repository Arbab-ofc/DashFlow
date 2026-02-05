import { Router } from "express";
import { getMeHandler, updateMeHandler } from "../controllers/userController";
import { requireAuth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validation";
import { updateProfileSchema } from "../validators/userValidator";

const router = Router();

router.get("/me", requireAuth, getMeHandler);
router.put("/me", requireAuth, validateRequest(updateProfileSchema), updateMeHandler);

export default router;
