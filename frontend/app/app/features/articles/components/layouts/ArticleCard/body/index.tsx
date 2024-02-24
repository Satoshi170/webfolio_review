"use client";

import NextLink from "next/link";

import { CardBody, Heading, Text } from "@chakra-ui/react";
import Linkify from "linkify-react";

import RenderLink from "@/app/libs/linkify/RenderLink";

import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  isLink?: boolean;
  articleData: PortfolioData;
}

const ArticleCardBody: React.FC<Props> = ({ isLink = false, articleData }) => {
  const { id, title, content } = articleData;

  return (
    <CardBody
      py="1"
      as={isLink ? NextLink : undefined}
      href={isLink ? `/posts/${id}` : undefined}
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text fontSize="md" mt="3">
        <Linkify options={{ render: RenderLink }}>{content}</Linkify>
      </Text>
    </CardBody>
  );
};

export default ArticleCardBody;
