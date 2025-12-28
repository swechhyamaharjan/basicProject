import express from "express";
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"
import orderRouter from "./routers/orderRouter.js"
import logger from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import uploadRouter from "./routers/uploadRouter.js"

const app = express();

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(logger);

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

export default app;