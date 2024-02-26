"use client";

import { CardFooter, Divider, Flex, Stack, Text } from "@chakra-ui/react";

import CreateCommentButtonWithFormModal from "@/app/features/articles/_comments/components/CreateCommentButtonWithFormModal";
import LikeButton from "@/app/features/articles/_likes/components/layouts/LikeButton";
import { useToggleLikeArticleGood } from "@/app/features/articles/_likes/hooks/useToggleArticleGood";

import type { ArticleData } from "@/app/features/articles/types/articleData";

interface Props {
  articleData: ArticleData;
}

const ArticleCardFooter: React.FC<Props> = ({ articleData }) => {
  const { updatedAt } = articleData;
  const { isLiked, toggleLike, totalLiked } = useToggleLikeArticleGood(articleData);

  return (
    <CardFooter>
      <Stack w="full">
        <Divider />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LikeButton onClick={toggleLike} isLiked={isLiked} totalLiked={totalLiked} />
            <CreateCommentButtonWithFormModal articleData={articleData} />
          </Flex>
          <Text fontSize="sm" color="blackAlpha.500" my="auto">
            {updatedAt.toLocaleDateString()}
          </Text>
        </Flex>
      </Stack>
    </CardFooter>
  );
};

export default ArticleCardFooter;
