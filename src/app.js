const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

require("dotenv").config({ path: "../.env" });

const taskRoutes = require("./routes/taskRoutes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");

const app = express();

require("./models/initDB");

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
module.exports = app;