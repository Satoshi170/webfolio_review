"use client";

import { Tag } from "@chakra-ui/react";

import { postCommentTagStyles } from "../../tags/postComment/theme/styleMap";

import type { CommentTagData } from "@/app/types/axios/portfolio/comment/comment";

interface Props {
  tag: CommentTagData;
}

const PostCommentTag: React.FC<Props> = ({ tag }) => {
  const { label, colorTheme } = postCommentTagStyles[tag];

  return (
    <Tag size="sm" variant="solid" colorScheme={colorTheme}>
      {label}
    </Tag>
  );
};

export default PostCommentTag;
