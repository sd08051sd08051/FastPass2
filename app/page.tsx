// "use client" ディレクティブをファイルの一番上に移動
// "use client";

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/next-auth/microcms/client";
import { nextAuthOptions } from "./lib/next-auth/options";
import { BookType } from "./types/types";

export default async function Home() {
  const { contents } = await getAllBooks();
  // console.log(contents);
  const session = await getServerSession(nextAuthOptions);
  const user: any = session?.user;

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
  }
  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Ramen Fast Pass
        </h2>
        {contents.map((book: BookType) => (
          <Book key={book.id} book={book} />
        ))}
      </main>
    </>
  );
}
