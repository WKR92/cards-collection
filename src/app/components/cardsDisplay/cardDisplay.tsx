"use client";

import { useEffect, useRef, useState } from "react";

import Button from "../reusable/button/button";
import Card from "../reusable/card/card";
import { ICard } from "../cardFormArea/cardForm/cardForm";
import Loader from "../reusable/loader/page";
import { getCards } from "@/app/feches/fetches";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pushToCardsStorage } from "../../../../services/storageService";
import { useCardContext } from "@/app/contexts/cardContext";
import { useQuery } from "@tanstack/react-query";

const CardsDisplay: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [showPrintArea, setShowPrintArea] = useState(false);
  const { cards } = useCardContext();
  const { isLoading, isError, data, error } = useQuery<
    { cards: ICard[] },
    Error
  >({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  if (isLoading)
    return (
      <div className="w-full p-4">
        <Loader />
      </div>
    );

  if (isError) return <h1>{error.message}</h1>;

  const handleDownloadPDF = () => {
    setShowPrintArea(true);
    const input = componentRef.current;
    if (!input) return;
    const pdf = new jsPDF("landscape", "pt", "letter");
    html2canvas(input, { backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.save("download.pdf");
      setShowPrintArea(false);
    });
  };

  return (
    <div className="w-full">
      <Button
        text="Prepare chosen cards for printing"
        classes="float-right mt-4 mr-4"
        fn={handleDownloadPDF}
      />
      <div className="w-full grid grid-cols-fluid">
        {data?.cards.map((card) => (
          <div key={card.name} className="p-8">
            <Card
              _id={card._id}
              name={card.name}
              image={card.image}
              type={card.type}
              description={card.description}
              cost={card.cost}
              cooldown={card.cooldown}
              background={card.background}
              check={false}
              showCheckbox={true}
            />
          </div>
        ))}
      </div>
      <div>
        {showPrintArea && (
          <div
            className="content-start flex flex-row space-around flex-wrap w-[27.9cm] h-[20.2cm] m-auto"
            ref={componentRef}
          >
            {cards.map((card) => (
              <div key={card.name} className="p-4 pt-4 h-fit">
                <Card
                  _id={card._id}
                  name={card.name}
                  image={card.image}
                  type={card.type}
                  description={card.description}
                  cost={card.cost}
                  cooldown={card.cooldown}
                  background={card.background}
                  toPrint={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsDisplay;