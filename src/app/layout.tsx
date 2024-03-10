import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { CardContextProvider } from "@/app/contexts/cardContext";
import ReactQueryWrapper from "./reactQueryWrapper";

export const metadata = {
  title: "Cards Collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="debug-screens">
        <ReactQueryWrapper>
          <CardContextProvider>{children}</CardContextProvider>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
