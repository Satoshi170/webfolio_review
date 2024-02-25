import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

export const postArticleGood = async (articleId: number): Promise<void> => {
  await api.post(`/articles/${articleId}/goods`, {}, addAuthInfoToRequest({}));
};
