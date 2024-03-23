"use client";

import Image from "next/image";
// import Link from "next/link";
import { BookType } from "../types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type BookProps = {
  book: BookType;
};

// eslint-disable-next-line react/display-name
const Book = ({ book }: BookProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user: any = session?.user;
  const router = useRouter();

  const startCheckout = async () => {
    try {
      // console.log(process.env.NEXT_PUBLIC_API_URL); //追加

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: book.title,
            price: book.price,
            userId: user?.id,
            bookId: book.id,
          }),
        }
      );
      // console.log(response);zz
      const responseData = await response.json();

      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const handlePurchaseClick = () => {
    setShowModal(true);
    // router.push("/login");
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePurchaseConfirm = () => {
    if (!user) {
      setShowModal(false);
      // ログインページへリダイレクト
      router.push("/login");
    } else {
      // Stripeで決済する
      startCheckout();
    }
  };

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handlePurchaseClick}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">現在の待ち時間は...分</p>
            <p className="mt-2 text-md text-slate-700">
              FastPass値段：{book.price}円
            </p>
          </div>
        </a>

        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">パスを購入しますか？</h3>
              <p className="text-xl mb-3">※ラーメン代は含まれておりません</p>
              <button
                onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;

// "use client";

// // 疑似データ
// const books = [
//   {
//     id: 1,
//     title: "Book 1",
//     thumbnail: "/thumbnails/discord-clone-udemy.png",
//     price: 2980,
//     author: {
//       id: 1,
//       name: "Author 1",
//       description: "Author 1 description",
//       profile_icon: "https://source.unsplash.com/random/2",
//     },
//     content: "Content 1",
//     created_at: new Date().toString(),
//     updated_at: new Date().toString(),
//   },
//   {
//     id: 2,
//     title: "Book 2",
//     thumbnail: "/thumbnails/notion-udemy.png",
//     price: 1980,
//     author: {
//       id: 2,
//       name: "Author 2",
//       description: "Author 2 description",
//       profile_icon: "https://source.unsplash.com/random/3",
//     },
//     content: "Content 2",
//     created_at: new Date().toString(),
//     updated_at: new Date().toString(),
//   },
//   {
//     id: 3,
//     title: "Book 3",
//     price: 4980,
//     thumbnail: "/thumbnails/openai-chatapplication-udem.png",
//     author: {
//       id: 3,
//       name: "Author 3",
//       description: "Author 3 description",
//       profile_icon: "https://source.unsplash.com/random/4",
//     },
//     content: "Content 3",
//     created_at: new Date().toString(),
//     updated_at: new Date().toString(),
//   },
//   // 他の本のデータ...
// ];

// // eslint-disable-next-line @next/next/no-async-client-component
// export default function Home() {
//   return (
//     <>
//       <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
//         <h2 className="text-center w-full font-bold text-3xl mb-2">
//           Book Commerce
//         </h2>
//         {books.map((book) => (
//           <Book key={book.id} book={book} />
//         ))}
//       </main>
//     </>
//   );
// }
