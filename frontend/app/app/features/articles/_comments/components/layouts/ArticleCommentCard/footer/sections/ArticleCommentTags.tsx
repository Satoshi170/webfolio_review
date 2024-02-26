"use client";

import { HStack } from "@chakra-ui/react";

import ArticleCommentTag from "../../../ArticleCommentTag";

import type { CommentTagData } from "@/app/features/articles/_comments/types";

interface Props {
  tags: CommentTagData[];
}

const ArticleCommentTags: React.FC<Props> = ({ tags }) => {
  if (tags && tags.length >= 1) {
    return (
      <HStack>
        {tags.map((tag, i) => (
          <ArticleCommentTag tag={tag} key={i} />
        ))}
      </HStack>
    );
  }
  return null;
};

export default ArticleCommentTags;
