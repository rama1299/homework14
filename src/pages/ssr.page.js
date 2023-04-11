import Wrapper from "@/components/Wrapper";
import Books from "@/components/BookCard";
import { getBooks } from "./api/books/index.page";

// SSR
// Datanya diambil baru setiap kali user request
export async function getServerSideProps() {
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
