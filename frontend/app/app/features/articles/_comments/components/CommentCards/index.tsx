"use client";

import { Text } from "@chakra-ui/react";

import { CommentContext } from "../../hooks/useCommentData";
import ArticleCommentCard from "../ArticleCommentCard";

import type { CommentData } from "../../types";

interface Props {
  commentsData: [] | CommentData[];
}

const CommentCards: React.FC<Props> = ({ commentsData }) => {
  if (commentsData.length == 0) {
    return <Text>コメントはありません</Text>;
  }

  return (
    <>
      {commentsData.map((commentData, i) => (
        <CommentContext.Provider value={commentData} key={i}>
          <ArticleCommentCard key={i} />
        </CommentContext.Provider>
      ))}
    </>
  );
};

export default CommentCards;
