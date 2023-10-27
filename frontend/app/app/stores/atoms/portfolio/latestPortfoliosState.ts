import { atom } from "recoil";

import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const latestPortfoliosDataState = atom<PortfolioData[]>({
  key: "latestPortfoliosData",
  default: []
});
