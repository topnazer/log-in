import { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ handleAdd }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("others");
  const addTask = () => {
    handleAdd(task, category, false);
    setTask("");
  };
  return (
    <div className="tform">
      <h3>Add Task</h3>
      <input
        type="text"
        name="task"
        id="task"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="work">School</option>
        <option value="house">House</option>
        <option value="others">Others</option>
      </select>
      <input type="date" name="date" id="date" />
      <div className="check">
        <input type="checkbox" name="prio" id="prio" />
        <label htmlFor="prio">Priority</label>
      </div>
      <button onClick={addTask}>Add</button>
    </div>
  );
}