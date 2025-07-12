import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./components/providers";
import { lovedByTheKing } from "./fonts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning className={lovedByTheKing.variable}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
