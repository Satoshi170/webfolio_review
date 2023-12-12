"use client";

import { Box, Card, CardBody, CardFooter, Flex, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRecoilValue } from "recoil";

import WithRedirectIfLoggedOut from "@/app/components/HOCs/WithRedirectIfLoggedOut";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import UpdatedDateText from "@/app/components/atoms/texts/UpdatedDateText";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";
import { LoggedInState, loginState } from "@/app/stores/atoms/loginState";

const UserCommentsPage: React.FC = () => {
  const { userData } = useRecoilValue(loginState) as LoggedInState;
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
            <Flex justifyContent="flex-end" w="full">
              <UpdatedDateText date={commentData.updatedAt} />
            </Flex>
          </CardFooter>
        </Card>
      ))}
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(UserCommentsPage);
