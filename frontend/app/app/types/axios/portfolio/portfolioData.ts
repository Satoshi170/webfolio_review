import { UserData } from "../../auth";

export interface PortfolioData {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
  user: UserData;
}
