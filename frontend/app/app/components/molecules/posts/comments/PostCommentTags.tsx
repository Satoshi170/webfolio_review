"use client";

import { HStack } from "@chakra-ui/react";

import PostCommentTag from "@/app/components/atoms/posts/comments/PostCommentTag";
import { CommentTagData } from "@/app/types/axios/portfolio/comment/comment";

interface Props {
  tags: CommentTagData[];
}

const PostCommentTags: React.FC<Props> = ({ tags }) => {
  if (tags && tags.length >= 1) {
    return (
      <HStack>
        {tags.map((tag, i) => (
          <PostCommentTag tag={tag} key={i} />
        ))}
      </HStack>
    );
  }
  return null;
};

export default PostCommentTags;
