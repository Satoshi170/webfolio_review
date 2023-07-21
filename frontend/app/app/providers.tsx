"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import theme from "./theme/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
