"use client";

import { CardFooter, Divider, Flex, Stack, Text } from "@chakra-ui/react";

import { useCommentData } from "@/app/hooks/datas/useCommentData";

const PostCommentCardFooter: React.FC = () => {
  const commentData = useCommentData();
  const { updatedAt } = commentData;

  return (
    <CardFooter>
      <Stack w="full">
        <Divider />
        <Flex justifyContent="end">
          <Text fontSize="xs" color="blackAlpha.500" my="auto">
            {updatedAt.toLocaleDateString()}
          </Text>
        </Flex>
      </Stack>
    </CardFooter>
  );
};

export default PostCommentCardFooter;
