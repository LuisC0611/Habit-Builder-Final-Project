import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleNewTask = (name, description, frequency) => {
    let points = 0;
    if (frequency === "daily") {
      points = 1;
    } else if (frequency === "weekly") {
      points = 3;
    } else if (frequency === "monthly") {
      points = 5;
    }
    const newTask = { name, description, frequency, points, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskForm onNewTask={handleNewTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onTaskCompletion={handleTaskCompletion} />
    </div>
  );
}

function TaskForm({ onNewTask }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = (event) => {
    event.preventDefault();
    onNewTask(name, description, frequency);
    setName("");
    setDescription("");
    setFrequency("daily");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <select value={frequency} onChange={(event) => setFrequency(event.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, onDeleteTask, onTaskCompletion }) {
  const renderTasks = (frequency) => {
    const filteredTasks = tasks.filter((task) => task.frequency === frequency);
    return filteredTasks.map((task, index) => (
      <div key={index}>
        <input type="checkbox" checked={task.completed} onChange={() => onTaskCompletion(index)} />
        <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.name}</h3>
        <p>{task.description}</p>
        <p>Points: {task.points}</p>
        <button onClick={() => onDeleteTask(index)}>Delete</button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Daily Tasks</h2>
      {renderTasks("daily")}
      <h2>Weekly Tasks</h2>
      {renderTasks("weekly")}
      <h2>Monthly Tasks</h2>
      {renderTasks("monthly")}
    </div>
  );
}

export default App;