"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import CheckLoginWrapper from "./features/auth/userSession/CheckLoginWrapper";
import theme from "./theme/theme";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <RecoilRoot>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <CheckLoginWrapper>{children}</CheckLoginWrapper>
        </ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  );
};

export default Providers;
