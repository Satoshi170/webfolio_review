"use client";

import { CardBody, Text } from "@chakra-ui/react";
import Linkify from "linkify-react";

import { useEditMode } from "@/app/hooks/useEditMode";
import RenderLink from "@/app/libs/linkify/RenderLink";

import { useCommentData } from "../../../../hooks/useCommentData";
import UpdateCommentForm from "../../../UpdateCommentForm";

const ArticleCommentCardBody: React.FC = () => {
  const commentData = useCommentData();
  const { isEditMode } = useEditMode();
  const { content } = commentData;
  if (isEditMode) {
    return (
      <CardBody>
        <UpdateCommentForm />
      </CardBody>
    );
  }
  return (
    <CardBody>
      <Text fontSize="xs">
        <Linkify options={{ render: RenderLink }}>{content}</Linkify>
      </Text>
    </CardBody>
  );
};

export default ArticleCommentCardBody;
