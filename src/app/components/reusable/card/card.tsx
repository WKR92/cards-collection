"use client";

import { ICard } from "../../cardFormArea/cardForm/cardForm";
import Image from "next/image";
import React from "react";
import { useCardContext } from "@/app/contexts/cardContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Card: React.FC<ICard & { showCheckbox?: boolean }> = ({
  _id,
  name,
  image,
  type,
  description,
  cost,
  cooldown,
  background,
  showCheckbox,
  toPrint,
  classes,
  price,
}) => {
  const { push } = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { cards, setCards } = useCardContext();

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsChecked(!isChecked);
    if (!isChecked)
      setCards([
        ...cards.filter((card) => card._id !== _id),
        {
          _id,
          name,
          image,
          type,
          description,
          cost,
          cooldown,
          background,
          price,
          check: !isChecked,
        },
      ]);
    if (isChecked) setCards([...cards.filter((card) => card._id !== _id)]);
  };

  const redirect = () => push(`/cards/${_id}}`);

  return (
    <div
      onClick={showCheckbox ? redirect : () => {}}
      className={`${
        showCheckbox
          ? "sm:hover:scale-110 hover:border-1 sm:hover:border-white sm:hover:shadow-sm sm:hover:shadow-white"
          : ""
      } ${
        classes ?? ""
      } transition-all duration-300 ease-in-out transform cursor-pointer relative border border-solid border-black border-1 min-w-[6cm] min-h-[8cm] w-[6cm] h-[8cm]`}
    >
      {showCheckbox && (
        <div className="hidden lg:block absolute top-0 right-0 pt-[6px] pr-[6px]">
          <input
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleCheckboxClick(e)}
            checked={isChecked}
            type="checkbox"
            className="h-8 w-8 cursor-pointer"
            disabled={
              cards.filter((card) => card.check).length >= 8 &&
              !cards.filter((card) => card._id === _id)[0]?.check
            }
          />
        </div>
      )}
      <Image
        className="z-[-1] w-full h-full absolute top-0 bottom-0 right-0 left-0"
        alt="card_main_img"
        src={background}
        sizes="100vw"
        width={0}
        height={0}
      />
      <div>
        <div className="border border-solid border-black border-1 mt-[.2cm] w-[5cm] h-[0.8cm] text-black text-xs m-auto bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center">
          <span className={`${!toPrint ? "" : "mb-[15px]"}`}>{name}</span>
        </div>
        <div className="w-[5cm] m-auto my-1 h-auto border border-1 border-solid border-black min-h-[3.5cm]">
          {image && (
            <Image
              className="w-full h-[3.5cm]"
              alt="card_main_img"
              src={image}
              sizes="100vw"
              width={0}
              height={0}
            />
          )}
        </div>
        <div className="h-[0.7cm] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 z-50 backdrop:border border-solid border-1 border-black p-1 text-xs flex items-center justify-center relative w-[4.5cm] m-auto -mt-3 text-white">
          <span className={`${!toPrint ? "" : "mb-[15px]"}`}>{type}</span>
        </div>
        <div className="border border-1 border-solid border-black w-[5cm] m-auto h-[2.75cm] p-3 -mt-2 text-black text-xs mb-4">
          <p
            className={`${
              !toPrint ? "" : "-mt-[8px]"
            } break-words whitespace-pre-line text-white text-[10px] sm:text-xs `}
          >
            {description}
          </p>
        </div>
      </div>
      <div className="bg-blue-400 flex items-center justify-center w-[70px] h-[70px] rounded-full absolute -top-[25px] -left-[25px]">
        <p className={`ml-[18px] ${!toPrint ? "mt-[18px]" : ""} font-bold`}>
          {cost}
        </p>
      </div>
      <div
        className={`absolute w-[25px] h-[100px] ${
          !toPrint ? "bg-gray-800" : "bg-white"
        } z-50 -top-[27px] -left-[26px] border-none`}
      ></div>
      <div
        className={`absolute w-[50px] h-[26px] -top-[27px] -left-[2px] ${
          !toPrint ? "bg-gray-800" : "bg-white"
        }`}
      ></div>
      <div
        className={`z-50 absolute w-[25px] h-[50px] -bottom-[2px] -right-[26px] ${
          !toPrint ? "bg-gray-800" : "bg-white"
        }`}
      ></div>
      <div
        className={`z-50 absolute w-[70px] h-[26px] -bottom-[27px] -right-[26px] ${
          !toPrint ? "bg-gray-800" : "bg-white"
        }`}
      ></div>
      <div className="flex items-center justify-center bg-blue-400 w-[70px] h-[70px] rounded-full absolute -bottom-[25px] -right-[25px] ">
        <p
          className={`mr-[18px] ${
            !toPrint ? "mb-[18px]" : "mb-[36px]"
          } font-bold`}
        >
          {cooldown}
        </p>
      </div>
      {type === "Przedmiot" && (
        <p className={`text-center text-orange-500 ${toPrint ? "hidden" : ""}`}>
          Price: {price}
        </p>
      )}
    </div>
  );
};

export default Card;
