import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Koulen } from "next/font/google";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["devanagari"],
});
const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${poppins.className} ${koulen.variable} w-screen h-screen bg-black`}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}