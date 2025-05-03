let tasks = [
    { id: 1, name: 'Task 1', description: 'This is task 1' },
    { id: 2, name: 'Task 2', description: 'This is task 2' },
  ];
  
  // Get all tasks
  const getAllTasks = (req, res) => {
    res.status(200).json(tasks);
  };
  
  // Get task by ID
  const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
  };
  
  // Create a new task
  const createTask = (req, res) => {
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
  };
  
  // Update a task
  const updateTask = (req, res) => {
    const { name, description } = req.body;
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
  
    task.name = name || task.name;
    task.description = description || task.description;
  
    res.status(200).json(task);
  };
  
  // Delete a task
  const deleteTask = (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Task not found');
  
    tasks.splice(index, 1);
    res.status(204).send();
  };
  
  module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
  };
  