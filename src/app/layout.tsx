import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { inter, lovedByTheKing } from "@/fonts";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "WhiteLie | Platonic Companionship Service",
  description: "A peer-to-peer platonic companionship service connecting users for social events, family gatherings, and professional activities.",
  keywords: ["companionship", "social events", "platonic relationships", "social support"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lovedByTheKing.variable}`}>
      <body>
        <Navbar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
