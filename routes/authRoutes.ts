import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController";
import { loginRateLimiter } from "../rate_limiters/auth";
import { loginUserSchema, registerUserSchema } from "../validators/auth.schema";
import validateSchema from "../middleware/validateSchemaMiddleware";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

router.post('/register', validateSchema(registerUserSchema), registerUser);
router.post('/login', loginRateLimiter, validateSchema(loginUserSchema), loginUser);
router.post('/logout', verifyToken, logoutUser);

export default router;

