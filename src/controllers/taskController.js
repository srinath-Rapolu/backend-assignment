const db = require("../config/db");

// CREATE TASK
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  db.run(
    "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
    [title, description, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to create task" });
      }
      res.status(201).json({ message: "Task created" });
    }
  );
};

// GET USER TASKS

// exports.getTasks = (req, res) => {

//   // Everyone can see all tasks
//   db.all("SELECT * FROM tasks", [], (err, tasks) => {

//     if (err) {
//       return res.status(500).json({ message: "Failed to fetch tasks" });
//     }

//     res.json(tasks);
//   });

// };

exports.getTasks = (req, res) => {

  // ADMIN sees all tasks
  if (req.user.role === "admin") {

    db.all("SELECT * FROM tasks", [], (err, tasks) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch tasks" });
      }
      res.json(tasks);
    });

  } else {

    // USER sees only own tasks
    db.all(
      "SELECT * FROM tasks WHERE user_id = ?",
      [req.user.id],
      (err, tasks) => {
        if (err) {
          return res.status(500).json({ message: "Failed to fetch tasks" });
        }
        res.json(tasks);
      }
    );
  }
};


// DELETE TASK


exports.deleteTask = (req, res) => {

  // ADMIN can delete any task
  if (req.user.role === "admin") {

    db.run(
      "DELETE FROM tasks WHERE id = ?",
      [req.params.id],
      function (err) {
        if (err) {
          return res.status(500).json({ message: "Delete failed" });
        }
        res.json({ message: "Deleted by admin" });
      }
    );

  } else {
    // USER can delete ONLY their own task
    db.run(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [req.params.id, req.user.id],
      function (err) {

        if (err) {
          return res.status(500).json({ message: "Delete failed" });
        }

        // If no rows deleted → user tried deleting someone else's task
        if (this.changes === 0) {
          return res.status(403).json({ message: "Not allowed" });
        }

        res.json({ message: "Deleted" });
      }
    );
  }
};
