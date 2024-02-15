"use client";

import { CardFooter, Divider, Flex, Stack, Text } from "@chakra-ui/react";

import { usePostOrDeletePortfoliosByIdGoodsOperation } from "@/app/hooks/operations/portfolio/good/usePostOrDeletePortfoliosByIdGoodsOperation";


import CreateCommentButtonWithModal from "../../organisms/apiActionButtons/posts/comments/CreateCommentButtonWithModal";
import LikeButton from "../actionButtons/LikeButton";

import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  portfolioData: PortfolioData;
}

const PostCardFooter: React.FC<Props> = ({ portfolioData }) => {
  const { updatedAt } = portfolioData;
  const { isLiked, toggleLike, totalLiked } =
    usePostOrDeletePortfoliosByIdGoodsOperation(portfolioData);

  return (
    <CardFooter>
      <Stack w="full">
        <Divider />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LikeButton onClick={toggleLike} isLiked={isLiked} totalLiked={totalLiked} />
            <CreateCommentButtonWithModal portfolioData={portfolioData} />
          </Flex>
          <Text fontSize="sm" color="blackAlpha.500" my="auto">
            {updatedAt.toLocaleDateString()}
          </Text>
        </Flex>
      </Stack>
    </CardFooter>
  );
};

export default PostCardFooter;
