import express from "express"
import { addOrder, deliverOrder, getMyOrders, getOrderById, getOrders, payOrder } from "../controllers/orderController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";

const router = express.Router();

router.post("/" ,checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOrders);
router.get("/myorder", checkAuth, getMyOrders);
router.get("/:id", checkAuth, getOrderById);
router.put("/pay/:id", checkAuth, checkAdmin, payOrder);
router.put("/deliver/:id", checkAuth, checkAdmin, deliverOrder);

export default router;