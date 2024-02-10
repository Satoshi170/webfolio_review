import { operationStatuses } from "@/app/constants/datas/portfolios/operationStatuses";

import { CommentData } from "./comment/comment";
import { UserData } from "../../auth";

interface Good {
  userId: number;
}

type OperationStatus = (typeof operationStatuses)[number]["value"];

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
