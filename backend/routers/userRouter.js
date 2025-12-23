import express from "express"
import { login, signup, logout, updateProfile, getUserProfile, deleteUser } from "../controllers/userController.js";
import validateHandler from "../middlewares/validationHandler.js";
import { userAddSchema } from "../models/user.js";
import checkAuth from "../middlewares/checkAuth.js";
 
const router = express.Router();

router.post("/signup", validateHandler(userAddSchema), signup);
router.post("/login", login);
router.post("/logout", checkAuth, logout);
router.get("/", checkAuth, getUserProfile);
router.put("/updateprofile", checkAuth, updateProfile);
router.delete('/:id', checkAuth, deleteUser);

export default router;
