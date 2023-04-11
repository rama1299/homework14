import { prisma } from "@/services/prisma";
import bcrypt from "bcrypt";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import validateMethod from "@/middlewares/validateMethod";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};

const handler = nc()
  .use(validateMethod(["POST"]))
  .post(login);

export default handler;
