import express from "express"
import { addOrder, getOrders } from "../controllers/orderController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";

const router = express.Router();

router.post("/" ,checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOrders );
export default router;