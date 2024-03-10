"use server";

import Cards from "../../../../../model/card";
import { ICard } from "../cardForm/cardForm";
import { revalidatePath } from "next/cache";

export const updateCardServerAction = async (cardData: ICard) => {
  "use server";
  await Cards.findOneAndUpdate({ _id: cardData._id }, cardData, {
    new: true,
  });
  revalidatePath("/cards", "page");
};
