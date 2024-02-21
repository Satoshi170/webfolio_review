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

import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import UpdatedDateText from "@/app/components/atoms/texts/UpdatedDateText";
import PostCommentTags from "@/app/components/molecules/posts/comments/PostCommentTags";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const UserCommentsPage: React.FC = () => {
  const { isLogin, userData } = useGetLoginState();

  if (!isLogin) {
    return null;
  }

  const commentDatas = userData.comments;

  if (commentDatas.length === 0) {
    return (
      <CenteredBox>
        <Text>まだ投稿にコメントをしていません</Text>
      </CenteredBox>
    );
  }

  return (
    <CenteredBox>
      <GoBackLink />
      {commentDatas.map((commentData, i) => (
        <Card key={i} w={{ base: "auto", md: "md" }} rounded="none">
          <CardBody w="full" as={NextLink} href={`/posts/${commentData.portfolio.id}`}>
            <Text fontSize="md">{commentData.content}</Text>
            <Spacer my="1" />
            <Box bg="gray.200" p="3">
              <Text color="blackAlpha.600">{commentData.portfolio.title}</Text>
            </Box>
          </CardBody>
          <CardFooter>
            <Stack w="full">
              <Divider />
              <Flex justifyContent="space-between" direction="row-reverse" w="full">
                <UpdatedDateText date={commentData.updatedAt} />
                <PostCommentTags tags={commentData.tags} />
              </Flex>
            </Stack>
          </CardFooter>
        </Card>
      ))}
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(UserCommentsPage);
