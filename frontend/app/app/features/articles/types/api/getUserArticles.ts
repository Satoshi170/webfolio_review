import type { ArticleData } from "../articleData";
import type { UserDataWithoutGoodsAndComments } from "@/app/types/auth";

export interface GetUserArticlesResponseData {
  user: UserDataWithoutGoodsAndComments;
  articles: ArticleData[] | [];
}

export interface GetUserArticlesSuccessData {
  status: "success";
  message: string;
  data: GetUserArticlesResponseData;
}
