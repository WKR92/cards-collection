"use client";

import { useEffect, useRef, useState } from "react";

import Button from "../reusable/button/button";
import Card from "../reusable/card/card";
import { ICard } from "../cardFormArea/cardForm/cardForm";
import Loader from "../reusable/loader/page";
import Search from "../reusable/search/search";
import { getCards } from "@/app/feches/fetches";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { useCardContext } from "@/app/contexts/cardContext";
import { useQuery } from "@tanstack/react-query";

const CardsDisplay: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [showPrintArea, setShowPrintArea] = useState(false);
  const [showPrintLoader, setShowPrintLoader] = useState(false);
  const [cardsDB, setCardsDB] = useState<ICard[]>([]);
  const { cards, setCards } = useCardContext();
  const { isLoading, isError, data, error } = useQuery<
    { cards: ICard[] },
    Error
  >({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  useEffect(() => {
    setCards([]);
  }, []);

  useEffect(() => {
    if (data) setCardsDB(data.cards.reverse());
  }, [data]);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  if (isLoading)
    return (
      <div className="w-full p-4 flex-center-center">
        <Loader />
      </div>
    );

  if (isError) return <h1>{error.message}</h1>;

  const handleDownloadPDF = async () => {
    if (!cards.length) {
      toast("No cards chosen to print", {
        hideProgressBar: false,
        autoClose: 4000,
        type: "error",
      });
      return;
    }
    setShowPrintLoader(true);
    setShowPrintArea(true);
    await delay(1000);
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
    setShowPrintLoader(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const filteredDBCards = data.cards.filter(
      (card) =>
        card.name.toLowerCase().includes(e.currentTarget.value) ||
        card.description.toLowerCase().includes(e.currentTarget.value) ||
        card.type.toLowerCase().includes(e.currentTarget.value)
    );
    if (e.currentTarget.value !== "") setCardsDB(filteredDBCards);
    if (e.currentTarget.value === "") setCardsDB(data.cards);
  };

  return (
    <div className="w-full">
      <div className="p-4 w-full block  sm:flex flex-row items-center justify-between">
        <Search customOnInput={handleSearch} />
        {showPrintLoader && (
          <div className="sm:float-right w-[270px] h-[42px] mx-auto sm:m-0 flex-center-center">
            <Loader />
          </div>
        )}
        {!showPrintLoader && (
          <Button
            text="Prepare chosen cards for printing"
            classes="sm:float-right min-w-[270px] mx-auto sm:m-0"
            fn={handleDownloadPDF}
          />
        )}
      </div>

      <div className="w-full sm:grid sm:grid-cols-fluid mb-4">
        {cardsDB.map((card) => (
          <div key={card._id} className="p-8">
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
              price={card.price ?? 'unknown'}
              classes="mx-auto sm:mx-0"
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
              <div key={card._id} className="p-4 pt-4 h-fit">
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
