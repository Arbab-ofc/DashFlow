import { Router } from "express";
import { loginHandler, signupHandler } from "../controllers/authController";
import { validateRequest } from "../middlewares/validation";
import { loginSchema, signupSchema } from "../validators/authValidator";

const router = Router();

router.post("/signup", validateRequest(signupSchema), signupHandler);
router.post("/login", validateRequest(loginSchema), loginHandler);

export default router;
