import { createContext, useContext } from "react";

import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const PortfolioContext = createContext<PortfolioData | null>(null);

export const usePortfolioData = () => {
  const portfolioData = useContext(PortfolioContext);

  if (portfolioData == null) {
    throw new Error("usePortfolioData must be used within a PortfolioContextProvider");
  }
  return portfolioData;
};
