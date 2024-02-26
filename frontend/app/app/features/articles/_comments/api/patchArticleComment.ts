import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import type { CommentParams } from "../types/api";

export const patchArticleComment = async (
  articleId: number,
  commentId: number,
  params: CommentParams
): Promise<void> => {
  await api.patch(
    `/articles/${articleId}/comments/${commentId}`,
    { comment: params },
    addAuthInfoToRequest({})
  );
};
