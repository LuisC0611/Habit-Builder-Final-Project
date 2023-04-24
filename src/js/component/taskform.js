import React, { useState } from "react";

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

export default TaskForm;
