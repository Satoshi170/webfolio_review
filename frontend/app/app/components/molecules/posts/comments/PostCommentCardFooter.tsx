"use client";

import { CardFooter, Divider, Flex, Stack } from "@chakra-ui/react";

import UpdatedDateText from "@/app/components/atoms/texts/UpdatedDateText";
import { useCommentData } from "@/app/hooks/datas/useCommentData";

import PostCommentTags from "./PostCommentTags";

const PostCommentCardFooter: React.FC = () => {
  const commentData = useCommentData();
  const { updatedAt, tags } = commentData;

  return (
    <CardFooter>
      <Stack w="full">
        <Divider />
        <Flex justifyContent="space-between" direction="row-reverse">
          <UpdatedDateText date={updatedAt} />
          <PostCommentTags tags={tags} />
        </Flex>
      </Stack>
    </CardFooter>
  );
};

export default PostCommentCardFooter;
