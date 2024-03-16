"use client";

import { CardFooter, Flex, Icon, Text } from "@chakra-ui/react";
import { BiComment } from "react-icons/bi";

import LikeButton from "@/app/features/articles/_likes/components/LikeButton";
import { useToggleLikeArticleGood } from "@/app/features/articles/_likes/hooks/useToggleArticleGood";
import { useArticleData } from "@/app/features/articles/hooks/useArticleData";
import { UpdatedDateText } from "@/app/components/atoms";

import OperationStatusBadge from "./OperationStatusBadge";

const ArticleFooter: React.FC = () => {
  const articleData = useArticleData();
  const { isLiked, toggleLike, totalLiked } = useToggleLikeArticleGood(articleData);
  const { operationStatus, totalComments, updatedAt } = articleData;

  return (
    <CardFooter alignItems="center" justifyContent="space-between">
      <Flex gap="3" alignItems="center">
        <LikeButton onClick={toggleLike} isLiked={isLiked} totalLiked={totalLiked} />
        <Flex alignItems="center" color="gray.500" gap="2">
          <Icon as={BiComment} />
          <Text>{totalComments}</Text>
        </Flex>
      </Flex>
      <Flex gap="3">
        <UpdatedDateText date={updatedAt} />
        <OperationStatusBadge value={operationStatus} />
      </Flex>
    </CardFooter>
  );
};

export default ArticleFooter;
