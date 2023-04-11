import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import Books from "@/components/BookCard";
import { getAllBooks } from "@/modules/fetch";

// CSR
export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Wrapper>
      {books?.books?.map((book) => (
        <Books key={`${book.id} ${book.title}`} {...book} />
      ))}
    </Wrapper>
  );
}
