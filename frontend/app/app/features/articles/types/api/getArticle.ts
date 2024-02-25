import type { ArticleData } from "../articleData";

export interface GetArticleSuccessData {
  status: "success";
  message: string;
  data: ArticleData;
}
