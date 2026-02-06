const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ message: "User already exists" });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret missing" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
          process.env.JWT_SECRET,
        { expiresIn: "1h" }
);

res.json({ token, role: user.role });

  });
};
