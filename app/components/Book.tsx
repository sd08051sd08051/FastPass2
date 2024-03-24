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
    // if (!user) {
    //   setShowModal(false);
    //   // ログインページへリダイレクト
    //   router.push("/login");
    // } else {
    //   // Stripeで決済する
    // startCheckout();
    router.push("book/checkout-success");
    // }
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
            src="/thumbnails/2.JPG"
            alt="Discord clone thumbnail"
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">G'sリアン</h2>
            <p className="mt-2 text-lg text-slate-600">
              現在の待ち時間は5555分
            </p>
            <p className="mt-2 text-md text-slate-700">FastPass値段：40円</p>
          </div>
        </a>
        <a
          onClick={handlePurchaseClick}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src="/thumbnails/1.JPG"
            alt="Discord clone thumbnail"
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">G'sリアン</h2>
            <p className="mt-2 text-lg text-slate-600">現在の待ち時間は555分</p>
            <p className="mt-2 text-md text-slate-700">FastPass値段：50円</p>
          </div>
        </a>

        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">パスを購入しますか？</h3>
              <p className="text-xl mb-3">※ラーメン代は含まれておりません</p>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  mr-5"
              >
                待ちます
              </button>

              <button
                onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                お先ご麺購入
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
