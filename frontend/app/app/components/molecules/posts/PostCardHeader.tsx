"use client";

import { CardHeader, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

import UserIcon from "../../atoms/users/UserIcon";
import OptionPostMenuButton from "../../organisms/apiActionButtons/posts/OptionMenuButton";

interface Props {
  isLink?: boolean;
  isUserPost?: boolean;
  portfolioData: PortfolioData;
}

const PostCardHeader: React.FC<Props> = ({
  isLink = false,
  isUserPost = false,
  portfolioData
}) => {
  const { user } = portfolioData;
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
          href={isLink ? `/users/${user.id}/posts` : undefined}
        >
          <UserIcon image={image} name={user.name} diameter={39} />
          <Heading fontSize="md">{user.name}</Heading>
        </Flex>
        {isUserPost && <OptionPostMenuButton portfolioData={portfolioData} />}
      </Flex>
    </CardHeader>
  );
};

export default PostCardHeader;
