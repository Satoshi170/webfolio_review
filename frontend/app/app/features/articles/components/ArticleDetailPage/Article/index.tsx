"use client";

import { Card } from "@chakra-ui/react";

import ArticleBody from "./Body";
import ArticleFooter from "./Footer";
import ArticleHeader from "./Header";

interface Props {
  isUser: boolean;
}

const ArticleSection: React.FC<Props> = ({ isUser }) => {
  return (
    <Card rounded="none">
      <ArticleHeader isUser={isUser} />
      <ArticleBody />
      <ArticleFooter />
    </Card>
  );
};

export default ArticleSection;
