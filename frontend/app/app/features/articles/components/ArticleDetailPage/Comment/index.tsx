"use client";

import { Box, Divider, Heading } from "@chakra-ui/react";

import CommentsList from "../../../_comments/components/CommentsList";
import CreateCommentForm from "../../../_comments/components/CreateCommentForm";

import type { CommentData } from "../../../_comments/types";

interface Props {
  commentsData: CommentData[] | [];
}

const CommentSection: React.FC<Props> = ({ commentsData }) => {
  return (
    <Box bg="white">
      <Heading as="h3" textAlign="center" size="md" my="4">
        コメント
      </Heading>
      <Divider />
      <CommentsList commentsData={commentsData} />
      <Divider />
      <CreateCommentForm />
    </Box>
  );
};

export default CommentSection;
