export const metadata = {
  title: "Card Collection - Item",
  description: "Specific item from collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

// import Cards from "../../../../model/card";
// import { ICard } from "@/app/components/cardFormArea/cardForm/cardForm";
// import { Metadata } from "next";
// import React from "react";

// type TCardModificationLayout = {
//   params: { id: string };
//   children: React.ReactNode;
// };

// export async function generateMetadata({
//   params,
// }: TCardModificationLayout): Promise<Metadata> {
//   const id = params.id;
//   const cleanID = decodeURI(id)
//     .replace(/"/g, '\\"')
//     .replace(/&/g, '","')
//     .replace(/=/g, '":"')
//     .replace(/}/g, "")
//     .replace(/{/g, "");

//   const card: ICard | null = await Cards.findById(cleanID);

//   return {
//     title: card?.name ?? "Item",
//   };
// }

// export default function Page({ children }: TCardModificationLayout) {
//   return <div>{children}</div>;
// }
