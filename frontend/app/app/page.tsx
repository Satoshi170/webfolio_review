"use client";

import { Heading, Text } from "@chakra-ui/react";

import { LoadingSpinner, SeeMoreLinkButton } from "./components/atoms";
import AboutSiteSection from "./components/organisms/AboutSiteSection";
import CenteredBox from "./components/styledWrappers/CenteredBox";
import ArticleCardsGridList from "./features/articles/components/ArticleCardsGridList";
import { useGetLatestArticles } from "./features/articles/hooks/useGetLatestArticles";
import { useGetPopularArticles } from "./features/articles/hooks/useGetPopularArticles";
import { useGetLoginState } from "./hooks/recoil/loginState/useGetLoginState";

const HomePage: React.FC = () => {
  const {
    popularArticlesData,
    error: error1,
    isLoading: isLoading1
  } = useGetPopularArticles();
  const {
    latestArticlesData,
    error: error2,
    isLoading: isLoading2
  } = useGetLatestArticles();
  const { isLogin } = useGetLoginState();

  if (isLoading1 || isLoading2) {
    return (
      <CenteredBox>
        <LoadingSpinner />
      </CenteredBox>
    );
  }

  if (error1 || error2 || !latestArticlesData || !popularArticlesData) {
    return <Text>データの取得に失敗しました</Text>;
  }

  return (
    <CenteredBox>
      {!isLogin && <AboutSiteSection />}
      <Heading my="2">話題の投稿</Heading>
      <ArticleCardsGridList articlesData={popularArticlesData} />
      <SeeMoreLinkButton href="/articles?sort=popular" />
      <Heading my="2">最近の投稿</Heading>
      <ArticleCardsGridList articlesData={latestArticlesData} />
      <SeeMoreLinkButton href="/articles?sort=desc" />
    </CenteredBox>
  );
};

export default HomePage;
