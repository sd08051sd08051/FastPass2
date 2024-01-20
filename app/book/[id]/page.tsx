import { getDetailBook } from "@/app/lib/next-auth/microcms/client";
import Image from "next/image";
import React from "react";

const DetailBook = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const book = await getDetailBook(params.id);
  console.log(book);
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={""}
          alt="ticketimage"
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">購入チケット</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: "<h1>Test</h1>" }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">公開日:</span>
            <span className="text-sm text-gray-500">最終更新:</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
