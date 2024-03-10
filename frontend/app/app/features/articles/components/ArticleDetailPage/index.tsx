"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Stack,
  Text
} from "@chakra-ui/react";
import { BiComment } from "react-icons/bi";

import LinkCardWithMetaData from "@/app/features/link_preview/components/LinkCard";
import { UpdatedDateText, UserIcon } from "@/app/components/atoms";

import OperationStatusBadge from "./OperationStatusBadge";
import OptionArticleMenuButton from "./OptionMenuButton";
import CreateCommentForm from "../../_comments/components/CreateCommentForm";
import ArticleCommentCard from "../../_comments/components/layouts/ArticleCommentCard";
import { CommentContext } from "../../_comments/hooks/useCommentData";
import { useGetComments } from "../../_comments/hooks/useGetComments";
import LikeButton from "../../_likes/components/layouts/LikeButton";
import { useToggleLikeArticleGood } from "../../_likes/hooks/useToggleArticleGood";
import { ArticleContext } from "../../hooks/useArticleData";

import type { ArticleData } from "../../types/articleData";

interface Props {
  articleData: ArticleData;
  isUser: boolean;
}

const ArticleDetailPage: React.FC<Props> = ({ articleData, isUser }) => {
  const {
    content,
    title,
    portfolioSiteUrl,
    operationStatus,
    repositoryUrl,
    totalComments,
    updatedAt,
    user
  } = articleData;

  const { isLiked, toggleLike, totalLiked } = useToggleLikeArticleGood(articleData);
  const { commentsData } = useGetComments(articleData.id);

  return (
    <ArticleContext.Provider value={articleData}>
      <Stack spacing="0">
        <Card rounded="none">
          <CardHeader as={Flex}>
            <Flex flex="1" gap="2" alignItems="center">
              <UserIcon image={user.image} name={user.name} diameter={30} />
              <Heading fontSize="md">{user.name}</Heading>
            </Flex>
            {isUser && <OptionArticleMenuButton articleData={articleData} />}
          </CardHeader>
          <CardBody>
            <Heading fontSize="lg" mb="3">
              {title}
            </Heading>
            <LinkCardWithMetaData url={portfolioSiteUrl} />
            <Text my="4">{content}</Text>
            {repositoryUrl && (
              <>
                <Text>リポジトリURL</Text>
                <LinkCardWithMetaData url={repositoryUrl} />
              </>
            )}
          </CardBody>
          <CardFooter alignItems="center" justifyContent="space-between">
            <Flex gap="3" alignItems="center">
              <LikeButton
                onClick={toggleLike}
                isLiked={isLiked}
                totalLiked={totalLiked}
              />
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
        </Card>
        <CreateCommentForm articleData={articleData} />
        {commentsData &&
          commentsData.length >= 1 &&
          commentsData.map((commentData, i) => (
            <CommentContext.Provider value={commentData} key={i}>
              <ArticleCommentCard key={i} />
            </CommentContext.Provider>
          ))}
      </Stack>
    </ArticleContext.Provider>
  );
};

export default ArticleDetailPage;
