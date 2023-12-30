"use client";

import { Tag } from "@chakra-ui/react";

import commentTagStyles from "@/app/theme/commentTagStyles";
import { CommentTagData } from "@/app/types/axios/portfolio/comment/comment";

interface Props {
  tag: CommentTagData;
}

const PostCommentTag: React.FC<Props> = ({ tag }) => {
  const color = commentTagStyles[tag.name];

  return (
    <Tag size="sm" variant="solid" colorScheme={color}>
      {tag.name}
    </Tag>
  );
};

export default PostCommentTag;
