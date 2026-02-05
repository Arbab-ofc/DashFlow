import { Router } from "express";
import { getMeHandler, updateMeHandler, updatePasswordHandler } from "../controllers/userController";
import { requireAuth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validation";
import { updatePasswordSchema, updateProfileSchema } from "../validators/userValidator";

const router = Router();

router.get("/me", requireAuth, getMeHandler);
router.put("/me", requireAuth, validateRequest(updateProfileSchema), updateMeHandler);
router.put("/me/password", requireAuth, validateRequest(updatePasswordSchema), updatePasswordHandler);

export default router;
