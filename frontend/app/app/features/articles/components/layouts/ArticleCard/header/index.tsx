"use client";

import NextLink from "next/link";

import { CardHeader, Flex, Heading } from "@chakra-ui/react";

import UserIcon from "@/app/components/atoms/users/UserIcon";

import OptionArticleMenuButton from "./sections/OptionMenuButton";

import type { ArticleData } from "@/app/features/articles/types/articleData";

interface Props {
  isLink?: boolean;
  isUserPost?: boolean;
  articleData: ArticleData;
}

const ArticleCardHeader: React.FC<Props> = ({
  isLink = false,
  isUserPost = false,
  articleData
}) => {
  const { user } = articleData;
  const image = user.image || "/defaultUserImage.png";

  return (
    <CardHeader>
      <Flex>
        <Flex
          flex="1"
          gap="4"
          alignItems="center"
          flexWrap="wrap"
          as={isLink ? NextLink : undefined}
          href={isLink ? `/users/${user.id}/articles` : undefined}
        >
          <UserIcon image={image} name={user.name} diameter={39} />
          <Heading fontSize="md">{user.name}</Heading>
        </Flex>
        {isUserPost && <OptionArticleMenuButton articleData={articleData} />}
      </Flex>
    </CardHeader>
  );
};

export default ArticleCardHeader;
