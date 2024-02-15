import type { CommentData } from "./comment/comment";
import type { UserData } from "../../auth";
import type { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";

interface Good {
  userId: number;
}

type OperationStatus = keyof typeof candidateOperationStatusData;

export interface PortfolioData {
  id: number;
  title: string;
  content: string;
  operationStatus: OperationStatus;
  portfolioSiteUrl: string;
  repositoryUrl: string | null;
  updatedAt: Date;
  user: UserData;
  goods: Good[];
  comments: CommentData[];
}
