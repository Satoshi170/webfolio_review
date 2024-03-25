"use client";

import { Text } from "@chakra-ui/react";

import ArticleCardsGridList from "@/app/features/articles/components/ArticleCardsGridList";
import { useGetArticles } from "@/app/features/articles/hooks/useGetArticles";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { LoadingSpinner } from "@/app/components/atoms";
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
      <Text p="6" textAlign="center" w="full">
        データの取得に失敗しました
      </Text>
    );
  }

  return (
    <CenteredBox>
      <ArticleCardsGridList articlesData={articlesData} />
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(PostsPage);
