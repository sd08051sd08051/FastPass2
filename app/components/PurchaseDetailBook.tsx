import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookType } from "../types/types";

type purchaseDetailBookprops = {
  purchaseDetailBook: BookType;
};

const PurchaseDetailBook = ({
  purchaseDetailBook,
}: purchaseDetailBookprops) => {
  return (
    <div>
      <Image
        priority
        src={purchaseDetailBook.thumbnail.url}
        alt={purchaseDetailBook.title}
        width={450}
        height={350}
        className="rounded-t-md"
      />
      <div className="px-4 py-4 bg-slate-100 rounded-b-md">
        <h2 className="text-lg font-semibold">{purchaseDetailBook.title}</h2>
        {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
        <p className="mt-2 text-md text-slate-700">
          値段：{purchaseDetailBook.price}円
        </p>
      </div>
    </div>
  );
};

export default PurchaseDetailBook;
