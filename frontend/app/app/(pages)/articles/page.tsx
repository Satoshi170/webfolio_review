"use client";

import { Text } from "@chakra-ui/react";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import { useGetArticles } from "@/app/features/articles/hooks/useGetArticles";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const ArticlesPage: React.FC = () => {
  const { articlesData, error, isLoading } = useGetArticles();

  if (isLoading) {
    <CenteredBox>
      <LoadingSpinner />
    </CenteredBox>;
  }

  if (error || !articlesData) {
    return (
      <CenteredBox>
        <Text>データの取得に失敗しました</Text>
      </CenteredBox>
    );
  }

  return (
    <CenteredBox>
      {articlesData.map((articleData, i) => (
        <ArticleCard
          articleData={articleData}
          linkOptions={{ header: true, body: true }}
          key={i}
        />
      ))}
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(ArticlesPage);
