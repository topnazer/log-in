import "./Todo.css";

import { Navbar, TaskForm, TaskList, Satistics, Footer } from "../../TodoA";
import { useState, useEffect } from "react";
import {
  onTasksSnapshot,
  createTask,
  updateTask,
  deleteTask,
} from "../../firebase";

export default function Todo({ user, logout }) {
  const [tasks, setTasks] = useState([]);
  const handleAdd = (newTask, category, priority) => {
    createTask(user.uid, newTask, category, priority);
  };
  const handleUpdate = (taskid, taskupdate) => {
    updateTask(user.uid, taskid, taskupdate);
  };
  const handleDelete = (taskid) => {
    deleteTask(user.uid, taskid);
  };
  useEffect(() => {
    if (user.uid) {
      const unsubscribe = onTasksSnapshot(user.uid, setTasks);
      return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
    }
  }, [user.uid]);
  return (
    <div className="todo">
      <Navbar user={user} logout={logout} />
      <div className="container">
        <div className="ts">
          <TaskForm handleAdd={handleAdd} />
          <Satistics tasks={tasks} />
        </div>
        <TaskList
          tasks={tasks}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <Footer/>
    </div>
  );
}