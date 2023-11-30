"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledComponentsRegistry from "./lib/registry";

// CONTEXT
import { SearchFIPEProvider } from "./context/SearchFIPE";

const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <StyledComponentsRegistry>
      <SearchFIPEProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SearchFIPEProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
