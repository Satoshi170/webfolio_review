"use client";

import { Tag } from "@chakra-ui/react";

import { postCommentTagStyles } from "./theme/styleMap";

import type { CommentTagData } from "../../types";

interface Props {
  tag: CommentTagData;
}

const ArticleCommentTag: React.FC<Props> = ({ tag }) => {
  const { label, colorTheme } = postCommentTagStyles[tag];

  return (
    <Tag size="sm" variant="solid" colorScheme={colorTheme}>
      {label}
    </Tag>
  );
};

export default ArticleCommentTag;
