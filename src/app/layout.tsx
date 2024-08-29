import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer } from "@/components/ui/index.ui";
import ContextProviders from "./providers";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ContextProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ContextProviders>
      </body>
    </html>
  );
}
