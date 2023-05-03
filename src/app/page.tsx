import CardFormArea from "./components/cardFormArea/cardFormArea";
import CardsDisplay from "./components/cardsDisplay/cardDisplay";

export default function Home() {
  return (
    <main className="w-full p-2">
      <CardFormArea />
      <CardsDisplay />
    </main>
  );
}
