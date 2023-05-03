import { CardContextProvider } from "@/app/contexts/cardContext";
import CardOverview from "../cardOverview";
import React from "react";

interface Page {
  params: {
    id: string;
  };
}

export const page = ({ params: { id } }: Page) => {
  const cleanID = decodeURI(id)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/}/g, "")
    .replace(/{/g, "");

  return (
    <CardContextProvider>
      <CardOverview id={cleanID} />
    </CardContextProvider>
  );
};

export default page;
