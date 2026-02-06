const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  deleteTask
} = require("../controllers/taskController");

// Protect all routes
router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);

module.exports = router;
