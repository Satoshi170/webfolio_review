import { createContext, useContext } from "react";

import type { ArticleData } from "@/app/features/articles/types/articleData";

export const ArticleContext = createContext<ArticleData | null>(null);

export const useArticleData = () => {
  const articleData = useContext(ArticleContext);

  if (articleData == null) {
    throw new Error("useArticleData must be used within a ArticleContextProvider");
  }
  return articleData;
};
