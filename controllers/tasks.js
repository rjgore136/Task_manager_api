import { generateObjectId } from "../utils/mainUtils.js";
import { tasks } from "../utils/constants/data.js";

export const createTask = (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    // console.log("Logged in user:", req.user);

    if (!title || !description)
      return res.status(400).json({
        success: false,
        message: "Title and description are required!",
      });

    const newTask = {
      _id: generateObjectId(),
      title,
      description,
      priority: priority || "low",
      dueDate: dueDate || new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user.email,
    };

    tasks.push(newTask);
    // console.log("task arr length", tasks.length);

    res
      .status(200)
      .json({ success: true, message: "Task created successfully.", newTask });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getTasks = (req, res) => {
  try {
    const { p = 2, n = 2, sort = "asc" } = req.query;
    const skip = (p - 1) * n;
    let result = [];
    let docCnt = 0;

    for (let i = 0; i < tasks.length; i++) {
      if (i + 1 <= skip) {
        continue;
      }
      if (docCnt >= n) break;
      result.push(tasks[i]);
      docCnt++;
    }

    //sorting
    if (sort === "asc") result.sort((a, b) => a.createdAt < b.createdAt);
    else if (sort === "desc") {
      result.sort((a, b) => a.createdAt > b.createdAt);
      result.reverse();
    }

    return res.status(200).json({
      success: true,
      result,
      currentPage: p,
      tasksOnCurrPage: result.length,
      totalTasks: tasks.length,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getTask = (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    if (!id)
      return res.status(400).json({
        success: false,
        message: "No task Id provided!",
      });

    const task = tasks.find((curr) => curr._id === id);

    // console.log("task", task);
    if (!task)
      return res.status(400).json({
        success: false,
        message: "No task found!",
      });

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    if (!id)
      return res.status(400).json({
        success: false,
        message: "No task Id provided!",
      });

    const task = tasks.find((curr) => curr._id === id);
    if (task.createdBy !== req.user.email)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Action!" });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "No task found!",
      });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.updatedAt = new Date();

    res
      .status(200)
      .json({ success: true, message: "Task updated successfully.", task });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        success: false,
        message: "No task Id provided!",
      });

    const index = tasks.findIndex((task) => task._id === id);
    if (index === -1)
      return res.status(404).json({
        success: false,
        message: "No task found!",
      });

    if (tasks[index].createdBy !== req.user.email)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Action!" });

    tasks.splice(index, 1);

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
