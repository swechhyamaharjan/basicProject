import express from "express"
import { login, signup } from "../controllers/userController.js";
import validateHandler from "../middlewares/validationHandler.js";
import { userAddSchema } from "../models/user.js";
 
const router = express.Router();

router.post("/signup", validateHandler(userAddSchema), signup);
router.get("/login", login)

export default router;
