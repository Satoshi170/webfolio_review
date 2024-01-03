"use client";

import { Card, Spacer } from "@chakra-ui/react";

import PostCommentCardBody from "@/app/components/molecules/posts/comments/PostCommentCardBody";
import PostCommentCardFooter from "@/app/components/molecules/posts/comments/PostCommentCardFooter";
import PostCommentCardHeader from "@/app/components/molecules/posts/comments/PostCommentCardHeader";
import { useCommentData } from "@/app/hooks/datas/useCommentData";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

const PostCommentCard: React.FC = () => {
  const { isLogin, userData } = useGetLoginState();
  const commentData = useCommentData();
  const isUserComment = isLogin ? commentData.user.id == userData.id : false;

  return (
    <Card w={{ base: "auto", md: "md" }} rounded="none">
      <PostCommentCardHeader isUserComment={isUserComment} />
      <Spacer my="-3" />
      <PostCommentCardBody />
      <Spacer my="-3" />
      <PostCommentCardFooter />
    </Card>
  );
};

export default PostCommentCard;
