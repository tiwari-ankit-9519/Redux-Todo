const z = require("zod");

const userSchema = z.object({
  username: z.string().min(1, { message: "Please enter a valid username" }),
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be of minimum 8 characters" }),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be of minimum 8 characters" }),
});

const todoSchema = z.object({
  title: z.string().min(1, { message: "Please enter a valid title" }),
  description: z
    .string()
    .min(1, { message: "Please enter a valid description" }),
});

module.exports = {
  userSchema,
  loginUserSchema,
  todoSchema,
};
