import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Retrieve tasks from Firebase on component mount
  useEffect(() => {
    const unsubscribe = db.collection("tasks").onSnapshot((snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });

    return unsubscribe;
  }, []);

  const handleNewTask = (name, description, frequency) => {
    let points = 0;
    if (frequency === "daily") {
      points = 1;
    } else if (frequency === "weekly") {
      points = 3;
    } else if (frequency === "monthly") {
      points = 5;
    }

    // Add the new task to Firebase
    db.collection("tasks").add({
      name,
      description,
      frequency,
      points,
      completed: false,
    });
  };

  const handleDeleteTask = (taskId) => {
    // Delete the task from Firebase
    db.collection("tasks").doc(taskId).delete();
  };

  const handleTaskCompletion = (taskId, completed) => {
    // Update the task in Firebase
    db.collection("tasks").doc(taskId).update({ completed });
  };

  return (
    <div className="App">
      <TaskForm onNewTask={handleNewTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onTaskCompletion={handleTaskCompletion} />
    </div>
  );
}

export default App;

