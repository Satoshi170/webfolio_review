import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import type { CommentParams } from "../types/api";

export const postArticleComment = async (
  articleId: number,
  params: CommentParams
): Promise<void> => {
  await api.post(
    `/articles/${articleId}/comments`,
    { comment: params },
    addAuthInfoToRequest({})
  );
};
