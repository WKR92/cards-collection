"use client";

import { ReactNode, createContext, useContext, useState } from "react";

import { ICard } from "../components/cardFormArea/cardForm/cardForm";

interface ICardContext {
  card: ICard;
  setCard: React.Dispatch<React.SetStateAction<ICard>>;
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

export const CardContext = createContext<ICardContext>({
  card: {
    name: "",
    image: "",
    type: "",
    description: "",
    cost: "",
    cooldown: "",
    background: "",
    price:  '',
  },
  setCard: () => {},
  cards: [],
  setCards: () => {},
});

export const CardContextProvider = ({ children }: { children: ReactNode }) => {
  const [card, setCard] = useState({} as ICard);
  const [cards, setCards] = useState<ICard[]>([]);

  return (
    <CardContext.Provider value={{ card, setCard, cards, setCards }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);
