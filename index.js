const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
