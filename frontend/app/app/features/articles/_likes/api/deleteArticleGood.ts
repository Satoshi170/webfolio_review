import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

export const deleteArticleGood = async (articleId: number): Promise<void> => {
  await api.delete(`/articles/${articleId}/goods`, addAuthInfoToRequest({}));
};
