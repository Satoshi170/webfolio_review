"use client";

import { CardFooter, Divider, Flex, Stack, Text } from "@chakra-ui/react";

import { usePostOrDeletePortfoliosByIdGoodsOperation } from "@/app/hooks/operations/portfolio/good/usePostOrDeletePortfoliosByIdGoodsOperation";
import LikeButton from "@/app/components/molecules/actionButtons/LikeButton";
import CreateCommentButtonWithModal from "@/app/components/organisms/apiActionButtons/posts/comments/CreateCommentButtonWithModal";

import type { ArticleData } from "@/app/features/articles/types/articleData";

interface Props {
  articleData: ArticleData;
}

const ArticleCardFooter: React.FC<Props> = ({ articleData }) => {
  const { updatedAt } = articleData;
  const { isLiked, toggleLike, totalLiked } =
    usePostOrDeletePortfoliosByIdGoodsOperation(articleData);

  return (
    <CardFooter>
      <Stack w="full">
        <Divider />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LikeButton onClick={toggleLike} isLiked={isLiked} totalLiked={totalLiked} />
            <CreateCommentButtonWithModal articleData={articleData} />
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
