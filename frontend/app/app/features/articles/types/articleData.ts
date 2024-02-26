import type { CommentData } from "../_comments/types";
import type { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";
import type { UserData } from "@/app/types/auth";

interface Good {
  userId: number;
}

type OperationStatus = keyof typeof candidateOperationStatusData;

export interface ArticleData {
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
