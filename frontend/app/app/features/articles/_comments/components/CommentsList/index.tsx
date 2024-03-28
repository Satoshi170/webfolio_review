"use client";

import NoComment from "./NoComment";
import CommentCards from "../CommentCards";

import type { CommentData } from "../../types";

interface Props {
  commentsData: CommentData[];
}

const CommentsList: React.FC<Props> = ({ commentsData }) => {
  if (commentsData.length == 0) {
    return <NoComment />;
  }

  return <CommentCards commentsData={commentsData} />;
};

export default CommentsList;
