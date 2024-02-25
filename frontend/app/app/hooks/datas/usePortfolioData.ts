import { createContext, useContext } from "react";

import type { ArticleData } from "@/app/features/articles/types/articleData";

export const PortfolioContext = createContext<ArticleData | null>(null);

export const usePortfolioData = () => {
  const portfolioData = useContext(PortfolioContext);

  if (portfolioData == null) {
    throw new Error("usePortfolioData must be used within a PortfolioContextProvider");
  }
  return portfolioData;
};
