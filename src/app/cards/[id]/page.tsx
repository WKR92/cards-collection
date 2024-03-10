import { CardContextProvider } from "@/app/contexts/cardContext";
import CardOverview from "../cardOverview";
import Cards from "../../../../model/card";
import Head from "next/head";
import { ICard } from "@/app/components/cardFormArea/cardForm/cardForm";
import React from "react";

interface Page {
  params: {
    id: string;
  };
}

export const page = async ({ params: { id } }: Page) => {
  const cleanID = decodeURI(id)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/}/g, "")
    .replace(/{/g, "");

  const cardDB: ICard | null = await Cards.findById(cleanID);
  const transformedCard = JSON.parse(JSON.stringify(cardDB));

  // if (!cardDB)
  //   return (
  //     <div className="flex justify-center items-center w-screen mt-5">
  //       <p>Card not found</p>
  //     </div>
  //   );

  return (
    <>
      {/* deprecated way of setting title
      <Head>
        <title>My page title</title>
      </Head> */}
      <CardContextProvider>
        <CardOverview cardFromDB={transformedCard} />
      </CardContextProvider>
    </>
  );
};

export default page;
