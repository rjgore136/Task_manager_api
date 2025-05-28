import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.js";
import { Authenticate } from "../middlewares/authenticate.js";
const router = express.Router();

router.post("/", Authenticate, createTask); //protected
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", Authenticate, updateTask); //protected
router.delete("/:id", Authenticate, deleteTask); //protected

export default router;
