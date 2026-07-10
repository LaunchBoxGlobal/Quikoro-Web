import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/global/Footer";

export const metadata: Metadata = {
  title: "quikoro",
  description: "",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`w-full ${manrope.className}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
