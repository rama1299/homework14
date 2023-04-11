import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import Books from "@/components/BookCard";
import { getBooks } from "./api/books/index.page";

// SSG
// Datanya static (hanya ketika pertama kali build)
export async function getStaticProps() {
  const books = await getBooks();

  return { props: { books } };
}

export default function Homepage({ books }) {
  return (
    <Wrapper>
      {books?.map((book) => (
        <Books key={`${book.id} ${book.title}`} {...book} />
      ))}
    </Wrapper>
  );
}
