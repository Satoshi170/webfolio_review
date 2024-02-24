"use client";

import { Text } from "@chakra-ui/react";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { useGetPortfolios } from "@/app/hooks/swr/portfolio/useGetPortfolios";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const PostsPage: React.FC = () => {
  const { portfoliosData, error, isLoading } = useGetPortfolios();

  if (isLoading) {
    <CenteredBox>
      <LoadingSpinner />
    </CenteredBox>;
  }

  if (error || !portfoliosData) {
    return (
      <CenteredBox>
        <Text>データの取得に失敗しました</Text>
      </CenteredBox>
    );
  }

  return (
    <CenteredBox>
      {portfoliosData.map((portfolioData, i) => (
        <ArticleCard
          articleData={portfolioData}
          linkOptions={{ header: true, body: true }}
          key={i}
        />
      ))}
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(PostsPage);
