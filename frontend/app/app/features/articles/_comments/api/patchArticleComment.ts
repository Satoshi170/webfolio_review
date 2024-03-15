import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import type { CommentData } from "../types";
import type { CommentParams } from "../types/api";

export const patchArticleComment = async (
  articleId: number,
  commentId: number,
  params: CommentParams
): Promise<CommentData> => {
  const response = await api.patch<CommentData>(
    `/articles/${articleId}/comments/${commentId}`,
    { comment: params },
    addAuthInfoToRequest({})
  );
  return response.data;
};
