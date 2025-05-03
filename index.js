const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, name: "Task 1", description: "This is task 1" },
  { id: 2, name: "Task 2", description: "This is task 2" },
];

app.get("/tasks", (req, res) => {
  console.log("GET /tasks endpoint hit");
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");
  res.status(200).json(task);
});

// 3. Create a new task
app.post("/tasks", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Name and description are required");

  const newTask = {
    id: tasks.length + 1, // Simple id generation
    name,
    description,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. Update a task
app.put("/tasks/:id", (req, res) => {
  const { name, description } = req.body;
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");

  task.name = name || task.name;
  task.description = description || task.description;

  res.status(200).json(task);
});

// 5. Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send("Task not found");

  tasks.splice(taskIndex, 1); // Remove the task
  res.status(204).send(); // No content
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
