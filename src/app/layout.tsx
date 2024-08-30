import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header, Footer } from "@/components/ui/index.ui";
import ContextProviders from "./providers";
import "./globals.scss";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Store Tech Test - Minsu Jung",
  description:
    "This is a tech test for a front-end developer role at Harvey Norman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ContextProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ContextProviders>
      </body>
    </html>
  );
}
