import { createContext, useContext } from "react";

import type { CommentData } from "@/app/types/axios/portfolio/comment/comment";

export const CommentContext = createContext<CommentData | null>(null);

export const useCommentData = () => {
  const commentData = useContext(CommentContext);

  if (commentData == null) {
    throw new Error("useCommentData must be used within a CommentContextProvider");
  }
  return commentData;
};
