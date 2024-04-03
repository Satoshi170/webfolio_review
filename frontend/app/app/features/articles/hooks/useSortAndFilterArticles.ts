import { useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { ArticleData } from "../types/articleData";

export const useSortAndFilterArticles = (initArticleData: ArticleData[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultSortOrder = searchParams.get("sort") || "desc";
  const initSort = (
    ["asc", "desc", "popular"].includes(defaultSortOrder) ? defaultSortOrder : "desc"
  ) as "asc" | "desc" | "popular";

  const [filterValues, setFilterValues] = useState<("maintenance" | "inactive")[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "popular">(initSort);

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
    router.replace(`${pathname}?sort=${order}`);
    setSortOrder(order);
  };

  return {
    initSort,
    filteredAndSortedArticles,
    applySortOrder,
    setExcludeFilter
  };
};
