"use client";

import { Card } from "@chakra-ui/react";

import { EditModeProvider } from "@/app/hooks/useEditMode";

import ArticleBody from "./Body";
import ArticleFooter from "./Footer";
import ArticleHeader from "./Header";

interface Props {
  isUser: boolean;
}

const ArticleSection: React.FC<Props> = ({ isUser }) => {
  return (
    <EditModeProvider>
      <Card rounded="none">
        <ArticleHeader isUser={isUser} />
        <ArticleBody />
        <ArticleFooter />
      </Card>
    </EditModeProvider>
  );
};

export default ArticleSection;
