import { atom } from "recoil";

import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const popularPortfoliosDataState = atom<PortfolioData[]>({
  key: "topPortfoliosData",
  default: []
});
