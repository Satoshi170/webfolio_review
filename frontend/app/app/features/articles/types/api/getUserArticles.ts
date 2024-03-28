import type { ArticleData } from "../articleData";
import type { UserData } from "@/app/types/auth";

export interface GetUserArticlesResponseData {
  user: UserData;
  articles: ArticleData[];
}
