import express from "express";
import userRouter from "./routers/userRouter.js"

const app = express();

//middleware
app.use(express.json())
app.use("/user", userRouter);


export default app;