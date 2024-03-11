"use client";

import { Stack } from "@chakra-ui/react";

import ArticleSection from "./Article";
import CreateCommentForm from "../../_comments/components/CreateCommentForm";
import ArticleCommentCard from "../../_comments/components/layouts/ArticleCommentCard";
import { CommentContext } from "../../_comments/hooks/useCommentData";
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
        <CreateCommentForm />
        {commentsData &&
          commentsData.length >= 1 &&
          commentsData.map((commentData, i) => (
            <CommentContext.Provider value={commentData} key={i}>
              <ArticleCommentCard key={i} />
            </CommentContext.Provider>
          ))}
      </Stack>
    </ArticleContext.Provider>
  );
};

export default ArticleDetailPage;
