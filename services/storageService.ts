import { ICard } from "@/app/components/cardFormArea/cardForm/cardForm";

const KEY = 'storedCards'

export const pushToCardsStorage = (data: ICard[]): void => {
  sessionStorage.setItem(KEY, JSON.stringify(data));
};

export const getCardsStorage = (): string | null => {
  return sessionStorage.getItem(KEY);
};

export const clearCardsStorage = (): void => {
  sessionStorage.removeItem(KEY);
};