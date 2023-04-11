import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import Books from "@/components/BookCard";
import { getBooks } from "./api/books/index.page";

// IS
// Datanya static  tapi diperbaharui dalam interval waktu tertentu
export async function getStaticProps() {
  const books = await getBooks();

  return { props: { books }, revalidate: 30 };
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
