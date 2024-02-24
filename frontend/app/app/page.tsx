"use client";

import { useRouter } from "next/navigation";

import { Heading, Text } from "@chakra-ui/react";

import LoadingSpinner from "./components/atoms/LoadingSpinner";
import SeeMoreButton from "./components/atoms/SeeMoreButton";
import AboutSiteSection from "./components/organisms/AboutSiteSection";
import CenteredBox from "./components/styledWrappers/CenteredBox";
import ArticleCard from "./features/articles/components/layouts/ArticleCard";
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
  const router = useRouter();
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
      <Heading my="2">最近の投稿</Heading>
      {latestArticlesData.map((article, i) => (
        <ArticleCard
          articleData={article}
          linkOptions={{ header: true, body: true }}
          key={i}
        />
      ))}
      <SeeMoreButton onClick={() => router.push("/posts")} />
      <Heading my="2">話題の投稿</Heading>
      {popularArticlesData.map((article, i) => (
        <ArticleCard
          articleData={article}
          linkOptions={{ header: true, body: true }}
          key={i}
        />
      ))}
      <SeeMoreButton onClick={() => router.push("/posts")} />
    </CenteredBox>
  );
};

export default HomePage;
