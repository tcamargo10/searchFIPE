"use client";

import StyledComponentsRegistry from "./lib/registry";

const Providers = ({ children }: React.PropsWithChildren) => {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default Providers;
