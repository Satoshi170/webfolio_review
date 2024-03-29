"use client";

import { CardHeader, Flex, Heading } from "@chakra-ui/react";

import { useEditMode } from "@/app/hooks/useEditMode";
import { UserIcon } from "@/app/components/atoms";

import OptionCommentMenuButton from "./sections/OptionCommentMenuButton";
import { useCommentData } from "../../../hooks/useCommentData";

interface Props {
  isUserComment?: boolean;
}

const ArticleCommentCardHeader: React.FC<Props> = ({ isUserComment = false }) => {
  const commentData = useCommentData();
  const { isEditMode } = useEditMode();
  const { user } = commentData;
  const image = user.image || "/defaultUserImage.png";

  return (
    <CardHeader>
      <Flex>
        <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
          <UserIcon image={image} name={user.name} diameter={25} />
          <Heading fontSize="sm">{user.name}</Heading>
        </Flex>
        {isUserComment && !isEditMode && <OptionCommentMenuButton />}
      </Flex>
    </CardHeader>
  );
};

export default ArticleCommentCardHeader;
