"use client"
import React, { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderLib,
} from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import MobileValueProvider from "@/context/mobile-value";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Payment, useHotelStore } from "@/store/hotel.store";
const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__hasLoadedApp = true;
    }
  }, []);

  return (

    <NuqsAdapter>
      <QueryClientProviderLib client={queryClient}>
        {/* <ThemeProvider

          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange> */}
        <MobileValueProvider>
          {children}
        </MobileValueProvider>
        {/* </ThemeProvider> */}
      </QueryClientProviderLib>
    </NuqsAdapter>
  );
};

export default MainProvider;
