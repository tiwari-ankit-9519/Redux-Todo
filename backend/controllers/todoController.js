const { PrismaClient } = require("@prisma/client");
const { todoSchema } = require("../validation/requestValidator");

const prisma = new PrismaClient();

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userID;
  try {
    const result = todoSchema.safeParse(req.body);
    if (!result.success) {
      const errorMessage = result.error.errors.map((err) => err.message);
      return res.status(400).json({
        message: errorMessage[0] || "Validation failed",
      });
    }
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: userId,
      },
    });

    res.status(201).json({
      todo,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!todos) {
      return res.status(404).json({
        msg: "No todos found!",
      });
    }

    res.status(201).json({
      todos,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.getSingleTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!todo) {
      return res.status(404).json({
        msg: "No todo found!",
      });
    }

    res.status(201).json({
      todo,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const result = todoSchema.safeParse(req.body);
    if (!result.success) {
      const errorMessage = result.error.errors.map((err) => err.message);
      return res.status(400).json({
        message: errorMessage[0] || "Validation failed",
      });
    }

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
      },
    });

    res.status(201).json({
      todo,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "To do deleted successfully!",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
