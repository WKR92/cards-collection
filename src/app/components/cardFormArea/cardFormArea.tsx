"use client";

import Button from "../reusable/button/button";
import CardForm from "./cardForm/cardForm";
import { GiCardBurn } from "react-icons/gi";
import { useState } from "react";

const CardFormArea = () => {
  const [showFormArea, setShowFormArea] = useState(false);

  const toggleFormArea = () => setShowFormArea(!showFormArea);

  return (
    <div className="border-b pb-2 w-full">
      <Button
        text="Add Card"
        fn={toggleFormArea}
        icon={<GiCardBurn size={20} />}
      />
      {showFormArea && <CardForm setShowFormArea={setShowFormArea} />}
    </div>
  );
};

export default CardFormArea;
