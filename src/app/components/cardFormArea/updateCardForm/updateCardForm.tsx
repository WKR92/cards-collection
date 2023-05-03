"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ICard } from "../cardForm/cardForm";
import MaxRowsTextArea from "../../reusable/textArea/maxRowsTextArea";
import UpdateInputBlock from "./updateCardInputBlock";
import isEqual from "lodash/isequal";
import { toast } from "react-toastify";
import { updateCard } from "@/app/feches/fetches";
import { useCardContext } from "@/app/contexts/cardContext";

interface IUpdateCardForm {
  cardDB: ICard;
}

const UpdateCardForm: React.FC<IUpdateCardForm> = ({ cardDB }) => {
  const { card, setCard } = useCardContext();
  const QueryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      QueryClient.invalidateQueries(["cards"]);
      toast("Card updated successfully", {
        hideProgressBar: false,
        autoClose: 4000,
        type: "success",
      });
    },
    onError: (error: any) => {
      toast(`Card update failed with: ${error.message}`, {
        hideProgressBar: false,
        autoClose: 4000,
        type: "error",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedCard: ICard = { ...card };
    Object.keys(updatedCard).forEach((key) => {
      const k = key as keyof ICard;
      if (k === "check" || k === "_id" || k === "toPrint") return;
      if (updatedCard[k] === "") {
        updatedCard[k] = cardDB[k];
      }
    });

    if (!isEqual(updatedCard, cardDB)) {
      mutation.mutate(updatedCard);
      setCard(updatedCard);
    }
    if (isEqual(updatedCard, cardDB))
      toast("Nothing to save", {
        hideProgressBar: false,
        autoClose: 4000,
        type: "error",
      });
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>,
    value: string
  ) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (value === "cost" || value === "cooldown") {
      if (!target.value.match(/^[0-9\-]*$/)) return;
    }
    setCard({
      ...card,
      [value]: target.value,
    });
  };

  const createInput = (
    name: string,
    value: string,
    maxLength?: number
  ) => {
    return (
      <input
        autoComplete="off"
        name={name}
        id={name}
        type="text"
        value={(card[value as keyof ICard] as string | readonly string[]) ?? ""}
        maxLength={maxLength}
        onInput={(e) => handleChange(e, value)}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6 min-w-[320px]">
        <UpdateInputBlock
          text="Card name"
          name="card_name"
          input={createInput("card_name", "name", 25)}
        />
        <UpdateInputBlock
          text="Card type"
          name="card_type"
          input={createInput("card_type", "type", 25)}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <UpdateInputBlock
          text="Card cost"
          name="card_cost"
          input={createInput("card_cost", "cost", 1)}
        />
        <UpdateInputBlock
          text="Card cooldown"
          name="card_cooldown"
          input={createInput("card_cooldown", "cooldown", 1)}
        />
      </div>

      <UpdateInputBlock
        text="Card image url"
        name="card_image"
        input={createInput("card_image", "image")}
      />

      <UpdateInputBlock
        text="Card background image url"
        name="card_background"
        input={createInput("card_background", "background")}
      />

      <UpdateInputBlock
        text="Card description"
        name="card_description"
        input={
          <MaxRowsTextArea
            name="card_description"
            id="card_description"
            maxLength={163}
            rows={5}
            maxRows={5}
            initValue={card.description ?? ""}
            customOnInput={(e) => handleChange(e, "description")}
            classes="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        }
      />

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Change
      </button>
    </form>
  );
};

export default UpdateCardForm;