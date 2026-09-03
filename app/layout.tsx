import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider"
import Header from "@/components/Header/Header";
import "./globals.css";

const inter  = Inter({
  variable: "--font-family",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--second-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Camper van rental service",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <TanStackProvider>
           <Header />
          {children}</TanStackProvider>
        </body>
    </html>
  );
}
