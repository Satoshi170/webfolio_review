import type { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";
import type { UserDataWithoutGoodsAndComments } from "@/app/types/auth";

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
  user: UserDataWithoutGoodsAndComments;
}
