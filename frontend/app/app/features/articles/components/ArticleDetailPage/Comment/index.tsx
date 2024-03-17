"use client";

import CommentsList from "../../../_comments/components/CommentsList";
import CreateCommentForm from "../../../_comments/components/CreateCommentForm";

import type { CommentData } from "../../../_comments/types";

interface Props {
  commentsData: CommentData[] | [] | undefined;
}

const CommentSection: React.FC<Props> = ({ commentsData }) => {
  if (!commentsData) return null;

  return (
    <>
      <CreateCommentForm />
      <CommentsList commentsData={commentsData} />
    </>
  );
};

export default CommentSection;
