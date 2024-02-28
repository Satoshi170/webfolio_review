"use client";

import NextLink from "next/link";

import { CardBody, Heading, Text } from "@chakra-ui/react";
import Linkify from "linkify-react";

import RenderLink from "@/app/libs/linkify/RenderLink";

import type { ArticleData } from "@/app/features/articles/types/articleData";

interface Props {
  isLink?: boolean;
  articleData: ArticleData;
}

const ArticleCardBody: React.FC<Props> = ({ isLink = false, articleData }) => {
  const { id, title, content } = articleData;

  return (
    <CardBody
      py="1"
      as={isLink ? NextLink : undefined}
      href={isLink ? `/articles/${id}` : undefined}
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text fontSize="md" mt="3">
        <Linkify options={{ render: RenderLink }}>{content}</Linkify>
      </Text>
    </CardBody>
  );
};

export default ArticleCardBody;
