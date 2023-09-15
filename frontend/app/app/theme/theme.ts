import { extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: inter,
        backgroundColor: "orange.50",
        color: "gray.800",
        minH: "100vh",
        display: "flex",
        flexDirection: "column"
      }
    }
  }
});

export default theme;
