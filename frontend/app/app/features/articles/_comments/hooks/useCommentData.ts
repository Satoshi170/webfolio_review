import { createContext, useContext } from "react";

import type { CommentData } from "../types";

export const CommentContext = createContext<CommentData | null>(null);

export const useCommentData = () => {
  const commentData = useContext(CommentContext);

  if (commentData == null) {
    throw new Error("useCommentData must be used within a CommentContextProvider");
  }
  return commentData;
};
