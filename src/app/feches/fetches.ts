import { ICard } from "../components/cardFormArea/cardForm/cardForm";

// export const wait = (duration: number) => {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// };

export const getCards = async () => {
  const res = await fetch("/api/cards", { method: "GET" });
  if (!res.ok) throw new Error("Error getting cards data");
  return await res.json();
};

export const postCards = async (cardData: ICard) => {
  const res = await fetch("/api/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cardData),
  });
  if (!res.ok) throw new Error("Error posting card data");
  return res;
};

export const updateCard = async (cardData: ICard) => {
  const res = await fetch("/api/cards", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cardData),
  });
  if (!res.ok) throw new Error("Error updating card data");
  return res;
};
