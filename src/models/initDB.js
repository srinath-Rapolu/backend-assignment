const db = require("../config/db");

// Users table
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user'
)
`);

// Tasks table
db.run(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
`);

console.log("Tables created (if not exist)");


