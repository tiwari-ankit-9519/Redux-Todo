const { PrismaClient } = require("@prisma/client");
const {
  userSchema,
  loginUserSchema,
} = require("../validation/requestValidator");
const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");

const client = new PrismaClient();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = userSchema.safeParse({
      username,
      email,
      password,
    });
    if (!result.success) {
      const errorMessage = result.error.errors.map((err) => err.message);
      return res.status(400).json({
        message: errorMessage[0] || "Validation failed",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await client.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      token: generateToken(user.id),
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = loginUserSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const errorMessage = result.error.errors.map((err) => err.message);
      return res.status(400).json({
        message: errorMessage[0] || "Validation failed",
      });
    }
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid credentials",
      });
    }

    res.status(201).json({
      token: generateToken(user.id),
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
