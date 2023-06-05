import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/MyContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { userData, logout } = useAuth();
  console.log(userData);

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newSubtaskTitles, setNewSubtaskTitles] = useState({});

  // Loading local storage
  useEffect(() => {
    const storedTasks = localStorage.getItem(userData.id);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [userData]);

  // Updating local storage
  useEffect(() => {
    localStorage.setItem(userData.id, JSON.stringify(tasks));
  }, [tasks, userData]);

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
        subtasks: [],
      };
      setTasks([newTask, ...tasks]);
      setNewTaskTitle("");
    }
  };

  const addSubtask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const newSubtask = {
        id: Date.now(),
        title: newSubtaskTitles[taskId] || "",
        completed: false,
      };

      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].subtasks.push(newSubtask);

      setTasks(updatedTasks);

      setNewSubtaskTitles({ ...newSubtaskTitles, [taskId]: "" });
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;

      setTasks(updatedTasks);
    }
  };

  const toggleSubtaskCompletion = (taskId, subtaskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const subtaskIndex = tasks[taskIndex].subtasks.findIndex(
        (subtask) => subtask.id === subtaskId
      );

      if (subtaskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].subtasks[subtaskIndex].completed =
          !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;

        setTasks(updatedTasks);
      }
    }
  };

  const handleSubtaskTitleChange = (taskId, e) => {
    setNewSubtaskTitles({
      ...newSubtaskTitles,
      [taskId]: e.target.value,
    });
  };

  return (
    <div className="dashboard-container">
      <div className="user-profile">
        <img src={userData.profilePic} alt="Profile" />
        <p>Welcome, {userData.name}!</p>
        <button onClick={logout}>Logout</button>
        <p id="section-selector">My To-do List</p>
      </div>
      <div className="todo-section">
        <h2>To-Do's</h2>
        <div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="todosection">
          {tasks.map((task) => (
            <li key={task.id} className="maintask">
              <input
                type="checkbox"
                className="maintasktitle"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {task.title}
              <ul>
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id} className="subtask">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() =>
                        toggleSubtaskCompletion(task.id, subtask.id)
                      }
                    />
                    <span className="subtask-title">{subtask.title}</span>
                  </li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  placeholder="Add a subtask"
                  value={newSubtaskTitles[task.id] || ""}
                  onChange={(e) => handleSubtaskTitleChange(task.id, e)}
                />
                <button onClick={() => addSubtask(task.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
