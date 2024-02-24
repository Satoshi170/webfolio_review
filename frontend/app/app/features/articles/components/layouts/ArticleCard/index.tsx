"use client";

import { Card } from "@chakra-ui/react";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import ArticleCardBody from "./body";
import ArticleCardFooter from "./footer";
import ArticleCardHeader from "./header";

import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface LinkOptions {
  header?: boolean;
  body?: boolean;
}

interface Props {
  articleData: PortfolioData;
  linkOptions?: LinkOptions;
}

const ArticleCard: React.FC<Props> = ({ articleData, linkOptions }) => {
  const { isLogin, userData } = useGetLoginState();
  if (!articleData || !articleData.user) {
    return null;
  }

  const { user } = articleData;
  const isUserPost = isLogin ? userData.id == user.id : false;

  return (
    <Card py="1" w={{ base: "auto", md: "md" }} rounded="none">
      <ArticleCardHeader
        articleData={articleData}
        isLink={linkOptions?.header}
        isUserPost={isUserPost}
      />
      <ArticleCardBody articleData={articleData} isLink={linkOptions?.body} />
      <ArticleCardFooter articleData={articleData} />
    </Card>
  );
};

export default ArticleCard;
