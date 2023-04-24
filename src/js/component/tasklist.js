import React from "react";

function TaskList({ tasks, onDeleteTask, onTaskCompletion }) {
  const renderTasks = (frequency) => {
    const filteredTasks = tasks.filter((task) => task.frequency === frequency);
    return filteredTasks.map((task) => (
      <div key={task.id}>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <p>Frequency: {task.frequency}</p>
        <p>Points: {task.points}</p>
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(event) => onTaskCompletion(task.id, event.target.checked)}
          />
          Completed
        </label>
        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
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

export default TaskList;
