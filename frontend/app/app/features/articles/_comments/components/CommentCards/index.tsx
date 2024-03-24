"use client";

import { CommentContext } from "../../hooks/useCommentData";
import ArticleCommentCard from "../ArticleCommentCard";

import type { CommentData } from "../../types";

interface Props {
  commentsData: CommentData[];
}

const CommentCards: React.FC<Props> = ({ commentsData }) => {
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
