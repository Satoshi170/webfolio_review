import { useEffect, useState } from "react";

import type { CommentData } from "../_comments/types";

export const useSortComments = (initCommentsData: CommentData[]) => {
  const [comments, setComments] = useState(initCommentsData);

  useEffect(() => {
    setComments(initCommentsData);
  }, [initCommentsData]);

  const sortOrder = (sortOrder: "asc" | "desc") => {
    if (sortOrder == "asc") {
      const newCommentsData = [...initCommentsData].sort(
        (x, y) => x.updatedAt.getTime() - y.updatedAt.getTime()
      );
      setComments(newCommentsData);
    } else if (sortOrder == "desc") {
      setComments(initCommentsData);
    } else {
      throw new TypeError();
    }
  };

  return { sortedComments: comments, sortOrder };
};
