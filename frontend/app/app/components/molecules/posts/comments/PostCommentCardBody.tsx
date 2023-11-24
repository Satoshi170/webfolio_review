"use client";

import { CardBody, Text } from "@chakra-ui/react";
import Linkify from "linkify-react";

import { useCommentData } from "@/app/hooks/datas/useCommentData";
import RenderLink from "@/app/libs/linkify/RenderLink";

const PostCommentCardBody: React.FC = () => {
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

export default PostCommentCardBody;
