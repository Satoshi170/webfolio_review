import type { ArticleData } from "@/app/features/articles/types/articleData";

export interface GetMeLikedArticles {
  status: "success";
  message: string;
  data: ArticleData[] | [];
}
