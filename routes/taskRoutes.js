const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, name: 'Task 1', description: 'This is task 1' },
  { id: 2, name: 'Task 2', description: 'This is task 2' },
];

// Get all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

// Get task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.status(200).json(task);
});

// Create a new task
router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }

  const newTask = {
    id: tasks.length + 1,
    name,
    description,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');

  task.name = name || task.name;
  task.description = description || task.description;

  res.status(200).json(task);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Task not found');

  tasks.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
