import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import type { CommentData } from "../types";
import type { CommentParams } from "../types/api";

export const postArticleComment = async (
  articleId: number,
  params: CommentParams
): Promise<CommentData> => {
  const response = await api.post<CommentData>(
    `/articles/${articleId}/comments`,
    { comment: params },
    addAuthInfoToRequest({})
  );
  return response.data;
};
