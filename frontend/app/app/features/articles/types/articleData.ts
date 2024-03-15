import type { candidateOperationStatusData } from "../constants/operationStatuses";
import type { UserData } from "@/app/types/auth";

type OperationStatus = keyof typeof candidateOperationStatusData;

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  operationStatus: OperationStatus;
  portfolioSiteUrl: string;
  repositoryUrl: string | null;
  updatedAt: Date;
  totalComments: number;
  totalLikes: number;
  user: UserData;
}
