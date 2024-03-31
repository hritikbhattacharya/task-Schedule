const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
app.use(cors());
app.use(express.json());

let tasks = [];
// Home
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//  add Task
app.post("/task", (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };
  tasks.push(task);
  console.log(tasks);
  res.send(`Task added: ${JSON.stringify(task)}`);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update task
app.put("/taskUpdate", (req, res) => {
  const taskId = req.body.id;
  const newStatus = req.body.status;

  console.log(req.body);

  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.status = newStatus;
    res.send(`Task updated: ${JSON.stringify(task)}`);
  } else {
    res.send("Task not found");
  }
});

// Delete task
app.delete("/task", (req, res) => {
  const taskId = req.body.id;
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index > -1) {
    const deletedTask = tasks.splice(index, 1);
    res.send(`Task deleted: ${JSON.stringify(deletedTask)}`);
  } else {
    res.send("Task not found");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
