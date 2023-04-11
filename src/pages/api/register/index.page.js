import bcrypt from "bcrypt";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import { prisma } from "@/services/prisma";
import validateMethod from "@/middlewares/validateMethod";
import { registerSchema } from "@/schema";

const register = async (req, res) => {
  try {
    const validationResult = await registerSchema.validateAsync(req.body);
    const userExist = await prisma.user.findUnique({
      where: { email: validationResult.email },
    });

    if (userExist) return res.status(400).json({ data: "Email has already taken" });

    validationResult.password = await bcrypt.hash(validationResult.password, 12);
    const createdUser = await prisma.user.create({
      data: validationResult,
    });

    const { password, ...result } = createdUser;
    const token = jwt.sign({ id: result.id, email: result.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};

const handler = nc()
  .use(validateMethod(["POST"]))
  .post(register);

export default handler;
