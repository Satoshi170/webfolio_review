"use client";

import { Tag } from "@chakra-ui/react";

import { CommentTagData } from "@/app/types/axios/portfolio/comment/comment";
import { getColorForTagId } from "@/app/utils/themes/posts/comments/getColorForTagId";

interface Props {
  tag: CommentTagData;
}

const PostCommentTag: React.FC<Props> = ({ tag }) => {
  const color = getColorForTagId(tag.id);

  return (
    <Tag size="sm" variant="solid" colorScheme={color}>
      {tag.name}
    </Tag>
  );
};

export default PostCommentTag;
