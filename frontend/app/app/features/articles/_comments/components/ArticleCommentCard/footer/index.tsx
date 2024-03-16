"use client";

import { CardFooter, Divider, Flex, Stack } from "@chakra-ui/react";

import { UpdatedDateText } from "@/app/components/atoms";

import ArticleCommentTags from "./sections/ArticleCommentTags";
import { useCommentData } from "../../../hooks/useCommentData";

const ArticleCommentCardFooter: React.FC = () => {
  const commentData = useCommentData();
  const { updatedAt, tags } = commentData;

  return (
    <CardFooter>
      <Stack w="full">
        <Divider />
        <Flex justifyContent="space-between" direction="row-reverse">
          <UpdatedDateText date={updatedAt} />
          <ArticleCommentTags tags={tags} />
        </Flex>
      </Stack>
    </CardFooter>
  );
};

export default ArticleCommentCardFooter;
