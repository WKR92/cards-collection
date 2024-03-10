"use client";

// import {
//   QueryClient,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";

import { ICard } from "../cardForm/cardForm";
import MaxRowsTextArea from "../../reusable/textArea/maxRowsTextArea";
import UpdateInputBlock from "./updateCardInputBlock";
import _ from "lodash";
import { toast } from "react-toastify";
import { updateCardServerAction } from "./serverActions";
import { useCardContext } from "@/app/contexts/cardContext";

// import { revalidatePath } from "next/cache";

// import { updateCard } from "@/app/feches/fetches";

interface IUpdateCardForm {
  cardDB: ICard;
}

const UpdateCardForm: React.FC<IUpdateCardForm> = ({ cardDB }) => {
  const { card, setCard } = useCardContext();
  // const queryClient = useQueryClient();

  // const QueryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: updateCard,
  //   onSuccess: () => {
  //     QueryClient.invalidateQueries(["cards"]);
  //     toast("Card updated successfully", {
  //       hideProgressBar: false,
  //       autoClose: 4000,
  //       type: "success",
  //     });
  //   },
  //   onError: (error: any) => {
  //     toast(`Card update failed with: ${error.message}`, {
  //       hideProgressBar: false,
  //       autoClose: 4000,
  //       type: "error",
  //     });
  //   },
  // });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedCard: ICard = { ...card };
    Object.keys(updatedCard).forEach((key) => {
      const k = key as keyof ICard;
      if (k === "check" || k === "_id" || k === "toPrint" || k === "classes")
        return;
      if (updatedCard[k] === "") {
        if (k === "price") {
          updatedCard[k] = cardDB[k] ?? "";
          return;
        }
        updatedCard[k] = cardDB[k];
      }
      if (card.type !== "Przedmiot") {
        updatedCard.price = null;
        return;
      }
    });

    if (!_.isEqual(updatedCard, cardDB)) {
      try {
        // mutation.mutate(updatedCard);
        // queryClient.invalidateQueries(["cards"]);
        updateCardServerAction(updatedCard);
        toast("Card updated successfully", {
          hideProgressBar: false,
          autoClose: 4000,
          type: "success",
        });
      } catch (error: any) {
        toast(`Card update failed with: ${error.message}`, {
          hideProgressBar: false,
          autoClose: 4000,
          type: "error",
        });
      }
      setCard(updatedCard);
    }
    if (_.isEqual(updatedCard, cardDB))
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
    const conditionForFirstLetterUppercase =
      value !== "image" && value !== "background";
    const val = target.value;
    const valueWithFirstLetterUppercase = conditionForFirstLetterUppercase
      ? val.charAt(0).toUpperCase() + val.slice(1)
      : val;
    setCard({
      ...card,
      [value]: conditionForFirstLetterUppercase
        ? valueWithFirstLetterUppercase.toString()
        : val.toString().toLowerCase(),
    });
  };

  const createInput = (
    name: string,
    value: string,
    type = "text",
    maxLength?: number
  ) => {
    return (
      <input
        autoComplete="off"
        name={name}
        id={name}
        type={type}
        value={(card[value as keyof ICard] as string | readonly string[]) ?? ""}
        maxLength={maxLength}
        onInput={(e) => handleChange(e, value)}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-[300px] max-w-[342px] mx-auto md:m-0 mt-8 md:mt-0"
    >
      <div className="grid sm:grid-cols-2 sm:gap-6">
        <UpdateInputBlock
          text="Card name"
          name="card_name"
          input={createInput("card_name", "name", "text", 25)}
        />
        <UpdateInputBlock
          text="Card type"
          name="card_type"
          input={createInput("card_type", "type", "text", 25)}
        />
      </div>

      <div className="grid sm:grid-cols-2 sm:gap-6">
        <UpdateInputBlock
          text="Card cost"
          name="card_cost"
          input={createInput("card_cost", "cost", "text", 1)}
        />
        <UpdateInputBlock
          text="Card cooldown"
          name="card_cooldown"
          input={createInput("card_cooldown", "cooldown", "text", 1)}
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

      {card.type === "Przedmiot" && (
        <UpdateInputBlock
          text="Price"
          name="card_price"
          input={createInput("card_price", "price", "number")}
        />
      )}

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
