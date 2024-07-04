const { Router } = require("express");
const router = Router();

const {
  createTodo,
  getTodos,
  getSingleTodo,
  toggleTodoCompleted,
  deleteTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/todo", authMiddleware, createTodo);
router.get("/todo", authMiddleware, getTodos);
router.get("/todo/:id", authMiddleware, getSingleTodo);
router.put("/todo/:id", authMiddleware, toggleTodoCompleted);
router.delete("/todo/:id", authMiddleware, deleteTodo);

module.exports = router;
