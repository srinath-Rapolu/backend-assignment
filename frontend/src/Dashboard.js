import React, { useState, useEffect } from "react";

function Dashboard({ onLogout }) {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  // AUTO LOAD TASKS AFTER LOGIN
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {

    if (!token) return;

    try {

      const res = await fetch("http://localhost:5000/api/v1/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // If unauthorized → logout
      if (res.status === 401) {
        alert("Session expired. Please login again.");
        logout();
        return;
      }

      const data = await res.json();

      // Ensure tasks is always array
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }

    } catch (err) {
      console.error("Fetch tasks error:", err);
      setTasks([]);
    }
  };

  const createTask = async () => {

    if (!title.trim()) {
      alert("Enter task title");
      return;
    }

    try {

      await fetch("http://localhost:5000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      });

      setTitle("");
      fetchTasks();

    } catch (err) {
      console.error("Create task error:", err);
    }
  };

  const deleteTask = async (id) => {

    try {

      const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      // If backend blocks delete (RBAC)
      if (res.status === 403) {
        alert("You can delete only your own tasks!");
        return;
      }

      fetchTasks();

    } catch (err) {
      console.error("Delete task error:", err);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    onLogout();
  };

  return (
    <div className="section">

      {/* USER INFO */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>
          Logged in as: <strong>{email}</strong> ({role})
        </p>
        <button onClick={logout}>Logout</button>
      </div>

      <h3>Dashboard</h3>

      <input
        value={title}
        placeholder="Task title"
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Add Task</button>

      <ul>
        {tasks.length === 0 && (
          <p>No tasks found</p>
        )}

        {tasks.map(task => (
          <li key={task.id} className="task-item">

            {task.title}

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default Dashboard;
// return res.status(403).json({ message: "Cannot delete others' tasks" });