import express from "express";
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"

const app = express();

//middleware
app.use(express.json())
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);


export default app;