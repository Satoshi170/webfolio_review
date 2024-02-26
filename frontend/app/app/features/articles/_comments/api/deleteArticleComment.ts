import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

export const deleteArticleComment = async (
  articleId: number,
  commentId: number
): Promise<void> => {
  await api.delete(
    `/articles/${articleId}/comments/${commentId}`,
    addAuthInfoToRequest({})
  );
};
