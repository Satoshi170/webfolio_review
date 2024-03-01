"use client";

import { Text } from "@chakra-ui/react";

import ArticleCardsGridList from "@/app/features/articles/components/ArticleCardsGridList";
import { useGetArticles } from "@/app/features/articles/hooks/useGetArticles";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import LoadingSpinner from "@/app/components/atoms/spinners/LoadingSpinner";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const PostsPage: React.FC = () => {
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
      <ArticleCardsGridList articlesData={articlesData} />
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(PostsPage);
