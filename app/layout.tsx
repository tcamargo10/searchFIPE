import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import GlobalStyles from "./styles/global";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MobiAuto",
  description: "Teste Frontend MobiAuto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={roboto.className}>
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
