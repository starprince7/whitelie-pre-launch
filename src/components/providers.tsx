'use client';

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
