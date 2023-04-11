import { prisma } from "@/services/prisma";
import nc from "next-connect";
import validateMethod from "@/middlewares/validateMethod";
import supabaseUploader from "@/middlewares/supabaseFormUploader";

const getBookById = async (req, res) => {
  try {
    const { id } = req.query;
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    res.json({ book });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.query;
    const book = await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.json({ book });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, author, publisher, year, pages } = req.body;
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        publisher,
        year,
        pages,
      },
    });
    res.json({ book });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const handler = nc()
  .use(validateMethod(["GET", "PUT", "DELETE"]))
  .get(getBookById)
  .use(supabaseUploader("image"))
  .delete(deleteBook)
  .put(updateBook);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
