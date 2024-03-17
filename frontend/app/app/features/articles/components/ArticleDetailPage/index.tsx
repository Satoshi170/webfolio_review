"use client";

import { Stack } from "@chakra-ui/react";

import ArticleSection from "./Article";
import CommentSection from "./Comment";
import { useGetComments } from "../../_comments/hooks/useGetComments";
import { ArticleContext } from "../../hooks/useArticleData";

import type { ArticleData } from "../../types/articleData";

interface Props {
  articleData: ArticleData;
  isUser: boolean;
}

const ArticleDetailPage: React.FC<Props> = ({ articleData, isUser }) => {
  const { id } = articleData;
  const { commentsData } = useGetComments(id);

  return (
    <ArticleContext.Provider value={articleData}>
      <Stack spacing="0">
        <ArticleSection isUser={isUser} />
        <CommentSection commentsData={commentsData} />
      </Stack>
    </ArticleContext.Provider>
  );
};

export default ArticleDetailPage;
