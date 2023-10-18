import { atom } from "recoil";

import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const portfolioDataState = atom<PortfolioData[]>({
  key: "portfolioData",
  default: []
});
