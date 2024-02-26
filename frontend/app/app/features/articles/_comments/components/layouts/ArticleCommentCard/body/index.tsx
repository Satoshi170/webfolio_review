"use client";

import { CardBody, Text } from "@chakra-ui/react";
import Linkify from "linkify-react";

import RenderLink from "@/app/libs/linkify/RenderLink";

import { useCommentData } from "../../../../hooks/useCommentData";

const ArticleCommentCardBody: React.FC = () => {
  const commentData = useCommentData();
  const { content } = commentData;

  return (
    <CardBody>
      <Text fontSize="xs">
        <Linkify options={{ render: RenderLink }}>{content}</Linkify>
      </Text>
    </CardBody>
  );
};

export default ArticleCommentCardBody;
