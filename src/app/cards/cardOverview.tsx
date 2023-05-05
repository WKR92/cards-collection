"use client";

import { useEffect, useState } from "react";

import Card from "@/app/components/reusable/card/card";
import { ICard } from "../components/cardFormArea/cardForm/cardForm";
import IUpdateCardForm from "../components/cardFormArea/updateCardForm/updateCardForm";
import Loader from "../components/reusable/loader/page";
import { getCards } from "../feches/fetches";
import { useCardContext } from "../contexts/cardContext";
import { useQuery } from "@tanstack/react-query";

const getDisplayValue = (
  card: ICard,
  cardDB: ICard,
  key: keyof ICard
): string => {
  return card && Object?.keys(card).length && card[key] && card[key] !== ""
    ? card[key]?.toString() || ""
    : cardDB[key]?.toString() || "";
};

interface ICardOverview {
  id: string;
}

export const CardOverview: React.FC<ICardOverview> = ({ id }) => {
  const { card, setCard } = useCardContext();
  const [cardDB, setCardDB] = useState({} as ICard);
  const { isLoading, isError, data, error } = useQuery<
    { cards: ICard[] },
    Error
  >({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  useEffect(() => {
    if (data) {
      const card = data?.cards?.filter((card: ICard) => card._id === id);
      if (card) {
        setCardDB(card[0]);
        setCard(card[0]);
      }
    }
  }, [data, id, setCard]);

  if (isLoading)
    return (
      <div className="w-full p-4 flex-center-center">
        <Loader />
      </div>
    );

  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="w-full flex flex-col justify-center gap-10 py-8 md:flex-row">
      <div
        className={`${
          card.type === "Przedmiot" ? "md:py-14" : "md:py-10"
        } mx-auto md:m-0 transition-all duration-700`}
      >
        <Card
          name={getDisplayValue(card, cardDB, "name")}
          description={getDisplayValue(card, cardDB, "description")}
          image={getDisplayValue(card, cardDB, "image")}
          background={getDisplayValue(card, cardDB, "background")}
          type={getDisplayValue(card, cardDB, "type")}
          cooldown={getDisplayValue(card, cardDB, "cooldown")}
          cost={getDisplayValue(card, cardDB, "cost")}
          price={getDisplayValue(card, cardDB, "price")}
        />
      </div>
      {cardDB && <IUpdateCardForm cardDB={cardDB} />}
    </div>
  );
};

export default CardOverview;
