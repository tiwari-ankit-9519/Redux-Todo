require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
