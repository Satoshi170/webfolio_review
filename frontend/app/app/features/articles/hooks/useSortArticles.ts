import { useState } from "react";

import type { ArticleData } from "../types/articleData";

export const useSortArticles = (initArticleData: ArticleData[]) => {
  const [articles, setArticles] = useState(initArticleData);

  const setExcludeFilter = (val: ("maintenance" | "inactive")[]) => {
    if (val.length == 0) {
      setArticles(initArticleData);
    } else {
      const newArticles = initArticleData.filter(
        (data) => !val.includes(data.operationStatus)
      );
      setArticles(newArticles);
    }
  };

  const sortOrder = (sortOrder: "asc" | "desc" | "popular") => {
    switch (sortOrder) {
      case "asc":
        setArticles((prev) =>
          [...prev].sort((x, y) => x.updatedAt.getTime() - y.updatedAt.getTime())
        );
        break;
      case "desc":
        setArticles((prev) =>
          [...prev].sort((x, y) => y.updatedAt.getTime() - x.updatedAt.getTime())
        );
        break;
      case "popular":
        setArticles((prev) => [...prev].sort((x, y) => y.totalLikes - x.totalLikes));
        break;
      default:
        throw new TypeError();
    }
  };

  return { sortedArticles: articles, sortOrder, setExcludeFilter };
};
