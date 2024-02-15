"use client";

import { useRouter } from "next/navigation";

import { Heading, Text } from "@chakra-ui/react";

import LoadingSpinner from "./components/atoms/LoadingSpinner";
import SeeMoreButton from "./components/atoms/SeeMoreButton";
import AboutSiteSection from "./components/organisms/AboutSiteSection";
import PostCard from "./components/organisms/posts/PostCard";
import CenteredBox from "./components/styledWrappers/CenteredBox";
import { useGetLoginState } from "./hooks/recoil/loginState/useGetLoginState";
import { useGetLatestPortfolios } from "./hooks/swr/portfolio/latestPortfolio/useGetLatestPortfolios";
import { useGetPopularPortfolios } from "./hooks/swr/portfolio/popularPortfolio/useGetPopularPortfolios";

const HomePage: React.FC = () => {
  const {
    popularPortfoliosData,
    error: error1,
    isLoading: isLoading1
  } = useGetPopularPortfolios();
  const {
    latestPortfoliosData,
    error: error2,
    isLoading: isLoading2
  } = useGetLatestPortfolios();
  const router = useRouter();
  const { isLogin } = useGetLoginState();

  if (isLoading1 || isLoading2) {
    return (
      <CenteredBox>
        <LoadingSpinner />
      </CenteredBox>
    );
  }

  if (error1 || error2 || !latestPortfoliosData || !popularPortfoliosData) {
    return <Text>データの取得に失敗しました</Text>;
  }

  return (
    <CenteredBox>
      {!isLogin && <AboutSiteSection />}
      <Heading my="2">最近の投稿</Heading>
      {latestPortfoliosData.map((portfolioData, i) => (
        <PostCard
          portfolioData={portfolioData}
          linkOptions={{ header: true, body: true }}
          key={i}
        />
      ))}
      <SeeMoreButton onClick={() => router.push("/posts")} />
      <Heading my="2">話題の投稿</Heading>
      {popularPortfoliosData.map((portfolioData, i) => (
        <PostCard
          portfolioData={portfolioData}
          linkOptions={{ header: true, body: true }}
          key={i}
        />
      ))}
      <SeeMoreButton onClick={() => router.push("/posts")} />
    </CenteredBox>
  );
};

export default HomePage;
