import express from "express";
import taskRouter from "./routes/tasks.js";
import authRouter from "./routes/auth.js";

const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

export default app;
