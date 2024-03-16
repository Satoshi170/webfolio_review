"use client";

import NextLink from "next/link";

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";

import ArticleCommentTags from "@/app/features/articles/_comments/components/ArticleCommentCard/footer/sections/ArticleCommentTags";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { useGetMyComments } from "@/app/features/me/hooks/useGetMyComments";
import { GoBackLink, UpdatedDateText } from "@/app/components/atoms";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const UserCommentsPage: React.FC = () => {
  const { commentsData, isLoading } = useGetMyComments();

  if (isLoading || !commentsData) return null;

  if (commentsData.length === 0) {
    return (
      <CenteredBox centerContent>
        <Text>まだ投稿にコメントをしていません</Text>
      </CenteredBox>
    );
  }

  return (
    <CenteredBox centerContent>
      <GoBackLink />
      {commentsData.map((commentData, i) => (
        <Card key={i} w={{ base: "auto", md: "md" }} rounded="none">
          <CardBody w="full" as={NextLink} href={`/articles/${commentData.article.id}`}>
            <Text fontSize="md">{commentData.content}</Text>
            <Spacer my="1" />
            <Box bg="gray.200" p="3">
              <Text color="blackAlpha.600">{commentData.article.title}</Text>
            </Box>
          </CardBody>
          <CardFooter>
            <Stack w="full">
              <Divider />
              <Flex justifyContent="space-between" direction="row-reverse" w="full">
                <UpdatedDateText date={commentData.updatedAt} />
                <ArticleCommentTags tags={commentData.tags} />
              </Flex>
            </Stack>
          </CardFooter>
        </Card>
      ))}
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(UserCommentsPage);
