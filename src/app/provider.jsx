"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "../lib/StoreProvider";

export default function Providers({ children }) {
  // ✅ Create a new QueryClient for the app
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StoreProvider>
  );
}
