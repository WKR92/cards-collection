"use client";

import Button from "../reusable/button/button";
import CardForm from "./cardForm/cardForm";
import { GiCardBurn } from "react-icons/gi";
import Link from "next/link";
import { useState } from "react";

const CardFormArea = () => {
  const [showFormArea, setShowFormArea] = useState(false);

  const toggleFormArea = () => setShowFormArea(!showFormArea);

  return (
    <div className="border-b pb-2 w-full">
      <div className="flex gap-5">
        <Button
          text="Add Card"
          fn={toggleFormArea}
          icon={<GiCardBurn size={20} />}
        />
        <Link
          href="/presTest"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Link navigation
        </Link>
      </div>

      {showFormArea && <CardForm setShowFormArea={setShowFormArea} />}
    </div>
  );
};

export default CardFormArea;
