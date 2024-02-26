"use client";

import { Card, Spacer } from "@chakra-ui/react";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import ArticleCommentCardBody from "./body";
import ArticleCommentCardFooter from "./footer";
import ArticleCommentCardHeader from "./header";
import { useCommentData } from "../../../hooks/useCommentData";

const ArticleCommentCard: React.FC = () => {
  const { isLogin, userData } = useGetLoginState();
  const commentData = useCommentData();
  const isUserComment = isLogin ? commentData.user.id == userData.id : false;

  return (
    <Card w={{ base: "auto", md: "md" }} rounded="none">
      <ArticleCommentCardHeader isUserComment={isUserComment} />
      <Spacer my="-3" />
      <ArticleCommentCardBody />
      <Spacer my="-3" />
      <ArticleCommentCardFooter />
    </Card>
  );
};

export default ArticleCommentCard;
