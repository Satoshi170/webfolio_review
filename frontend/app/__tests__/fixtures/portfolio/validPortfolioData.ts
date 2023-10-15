import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

import { validUserData } from "../auth/validUserData";

export const validPortfolioData: PortfolioData = {
  id: 1,
  title: "testTitle",
  content: "testContent",
  updatedAt: new Date(),
  user: validUserData
};
