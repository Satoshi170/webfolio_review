import { useCallback, useState } from "react";

import type { ArticleData } from "../types/articleData";

export const useSortArticles = (initArticleData: ArticleData[]) => {
  const [articles, setArticles] = useState(initArticleData);

  const sortOrder = useCallback(
    (sortOrder: "asc" | "desc" | "popular") => {
      switch (sortOrder) {
        case "asc": {
          const newArticlesData = [...initArticleData].sort(
            (x, y) => x.updatedAt.getTime() - y.updatedAt.getTime()
          );
          setArticles(newArticlesData);
          break;
        }
        case "desc":
          setArticles(initArticleData);
          break;
        case "popular": {
          const newArticlesData = [...initArticleData].sort(
            (x, y) => y.totalLikes - x.totalLikes
          );
          setArticles(newArticlesData);
          break;
        }
        default:
          throw new TypeError();
      }
    },
    [initArticleData]
  );

  return { sortedArticles: articles, sortOrder };
};
