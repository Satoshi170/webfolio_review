import type { ArticleData } from "@/app/features/articles/types/articleData";

export interface GetMeLikedPortfolios {
  status: "success";
  message: string;
  data: ArticleData[] | [];
}
