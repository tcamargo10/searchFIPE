import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import GlobalStyles from "./styles/global";
import Providers from "./providers";

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
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body>
        <GlobalStyles />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
