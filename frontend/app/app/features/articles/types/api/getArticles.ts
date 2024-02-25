import type { ArticleData } from "../articleData";

export interface GetArticlesSuccessData {
  status: "success";
  message: string;
  data: ArticleData[] | [];
}
