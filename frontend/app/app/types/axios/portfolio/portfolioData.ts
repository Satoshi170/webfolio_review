import { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";

import { CommentData } from "./comment/comment";
import { UserData } from "../../auth";

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
