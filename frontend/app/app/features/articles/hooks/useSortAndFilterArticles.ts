import { useState, useMemo } from "react";

import type { ArticleData } from "../types/articleData";

export const useSortAndFilterArticles = (initArticleData: ArticleData[]) => {
  const [filterValues, setFilterValues] = useState<("maintenance" | "inactive")[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "popular">("desc");

  const filteredAndSortedArticles = useMemo(() => {
    const filteredArticles = initArticleData.filter(
      (data) => !filterValues.includes(data.operationStatus)
    );

    switch (sortOrder) {
      case "asc":
        filteredArticles.sort((x, y) => x.updatedAt.getTime() - y.updatedAt.getTime());
        break;
      case "desc":
        filteredArticles.sort((x, y) => y.updatedAt.getTime() - x.updatedAt.getTime());
        break;
      case "popular":
        filteredArticles.sort((x, y) => y.totalLikes - x.totalLikes);
        break;
      default:
        throw new TypeError();
    }

    return filteredArticles;
  }, [initArticleData, filterValues, sortOrder]);

  const setExcludeFilter = (val: ("maintenance" | "inactive")[]) => {
    setFilterValues(val);
  };

  const applySortOrder = (order: "asc" | "desc" | "popular") => {
    setSortOrder(order);
  };

  return {
    filteredAndSortedArticles,
    applySortOrder,
    setExcludeFilter
  };
};
