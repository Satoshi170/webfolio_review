"use client";

import { CardFooter, Divider, Flex, Stack, Text } from "@chakra-ui/react";

import { usePostOrDeletePortfoliosByIdGoodsOperation } from "@/app/hooks/operations/portfolio/good/usePostOrDeletePortfoliosByIdGoodsOperation";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

import LikeButton from "../actionButtons/LikeButton";

interface Props {
  portfolioData: PortfolioData;
}

const PostCardFooter: React.FC<Props> = ({ portfolioData }) => {
  const { updatedAt } = portfolioData;
  const { isLiked, toggleLike } =
    usePostOrDeletePortfoliosByIdGoodsOperation(portfolioData);

  return (
    <CardFooter>
      <Stack w="full">
        <Divider />
        <Flex justifyContent="space-between">
          <Flex my="auto">
            <LikeButton onClick={toggleLike} isLiked={isLiked} />
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
