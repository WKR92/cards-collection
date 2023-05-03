"use client";

import { GiExtractionOrb, GiTimeTrap } from "react-icons/gi";
import { MdFlipToBack, MdTypeSpecimen } from "react-icons/md";
import { SiMagento, SiNamebase } from "react-icons/si";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BsBodyText } from "react-icons/bs";
import Card from "../../reusable/card/card";
import InputBlock from "./inputBlock";
import MaxRowsTextArea from "../../reusable/textArea/maxRowsTextArea";
import { baseBackground } from "../../../../../constants/constants";
import { postCards } from "@/app/feches/fetches";

export interface ICard {
  _id?: string;
  name: string;
  image: string;
  type: string;
  description: string;
  cost: string;
  cooldown: string;
  background: string;
  check?: boolean;
  toPrint?: boolean;
}

interface ICardForm {
  setShowFormArea: React.Dispatch<React.SetStateAction<boolean>>;
}
const CardForm: React.FC<ICardForm> = ({ setShowFormArea }) => {
  const [values, setValues] = useState({
    name: "",
    image: "",
    type: "",
    description: "",
    cost: "",
    cooldown: "",
    background: baseBackground,
  } as ICard);
  const QueryClient = useQueryClient();

  useEffect(() => {
    if (values.background === "")
      setValues({ ...values, background: baseBackground });
  }, [values]);

  const mutation = useMutation({
    mutationFn: postCards,
    onSuccess: () => QueryClient.invalidateQueries(["cards"]),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(values).every((value) => value !== ""))
      mutation.mutate(values);
    setValues({} as ICard);
    setShowFormArea(false);
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>, key: string) =>
    setValues({
      ...values,
      [key]: (e.target as HTMLInputElement).value,
    });

  const createInput = (
    placeholder: string,
    value: string,
    required = true,
    maxLength?: number
  ) => {
    return (
      <input
        required={required}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        value={(values[value as keyof ICard] as string) ?? ""}
        maxLength={maxLength}
        onInput={(e) => handleChange(e, value)}
        className="w-full focus: outline-none card-name border border-solid tex-sm border-indigo-500 rounded p-2 border-5"
      />
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full py-2 pt-4">
      <section className="w-full flex flex-col items-center justify-center bg-gray-850 body-font md:flex-col lg:flex-row">
        <div className="container px-4 md:px-[5rem] py-10 mx-auto">
          <InputBlock
            title="Card name"
            text="Nazwa może być jakakolwiek, ale niech pasuje do karty i nie
            przekracza 25 znaków."
            input={createInput("Card name", "name", true, 25)}
            icon={<SiNamebase size={100} />}
            side="left"
          />

          <InputBlock
            title="Card type"
            text="Typ karty to na przykład: Przedmiot, Akcja, Szybka akcja;
            cokolwiek innego, co wymyślisz i dobrze uzasadnisz. Do 25 znaków."
            input={createInput("Card type", "type", true, 25)}
            icon={<MdTypeSpecimen size={100} />}
            side="right"
          />

          <InputBlock
            title="Card cost"
            text="Koszt karty w akcjach może być liczbą albo - , który oznacza
            brak kosztu. Myślnik daje się przy przedmiotach. Pamiętaj, że
            postać ma zazwyczaj do dyspozycji 3 akcje."
            input={createInput("Card cost", "cost", true, 2)}
            icon={<GiExtractionOrb size={100} />}
            side="left"
          />

          <InputBlock
            title="Card cooldown"
            text="Czas odnowienia wskazuje ile tur musi upłynąć, by ponownie
            skorzystać z karty. Czas odnowienia 0 oznacza, że można używać
            karty ile razy się chce w danej turze. Czas odnowienia 1
            oznacza, że można używać karty, co ture, gdyż, co turę
            zdejmujemy z karty jeden token czasu odnowienia. Itd."
            input={createInput("Card cooldown", "cooldown", true, 2)}
            icon={<GiTimeTrap size={100} />}
            side="right"
          />

          <InputBlock
            title="Card image url"
            text="Kliknij prawym na docelowy obraz i wybierz
            kopiuj adres obrazu poczym wklej go tutaj."
            input={createInput("Card image url", "image", true)}
            icon={<SiMagento size={100} />}
            side="left"
          />

          <InputBlock
            title="Card background image url"
            text="Tło karty jest opcjonalne, ale możesz dać swoje jeśli chcesz.
            Kliknij prawym na docelowy obraz i wybierz
            kopiuj adres obrazu poczym wklej go tutaj"
            input={createInput("Card background image url", "background", true)}
            icon={<MdFlipToBack size={100} />}
            side="right"
          />

          <InputBlock
            title="Card description"
            text="Podaj opis działania karty. Możesz pozwolić sobie na
            kreatywność, najwyżej karta nie zostanie zaakceptowana."
            input={
              <MaxRowsTextArea
                required
                maxLength={163}
                rows={5}
                maxRows={5}
                placeholder="Description"
                initValue={values.description}
                customOnInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
                  setValues({
                    ...values,
                    description: (e.target as HTMLTextAreaElement).value,
                  })
                }
                classes="w-full focus: outline-none card-name border border-solid tex-sm border-indigo-500 rounded p-2 border-5"
              />
            }
            icon={<BsBodyText size={100} />}
            side="left"
          />

          <button
            type="submit"
            className="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Create
          </button>
        </div>

        <div className="relative pb-4 lg:h-[1850px] xl:pr-[9rem] 2xl:pr-[15rem]">
          <div className="sticky top-[2rem]">
            <Card
              name={values.name}
              image={values.image}
              type={values.type}
              description={values.description}
              cost={values.cost}
              cooldown={values.cooldown}
              background={values.background}
            />
          </div>
        </div>
      </section>
    </form>
  );
};

export default CardForm;
