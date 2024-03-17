"use client";

import { Box } from "@chakra-ui/react";

import CommentCards from "../CommentCards";

import type { CommentData } from "../../types";

interface Props {
  commentsData: CommentData[] | [];
}

const CommentsList: React.FC<Props> = ({ commentsData }) => {
  return (
    <Box>
      <CommentCards commentsData={commentsData} />
    </Box>
  );
};

export default CommentsList;
