"use client";

import { Text } from "@chakra-ui/react";

import ArticlesPage from "@/app/features/articles/components/ArticlesPage";
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

  return <ArticlesPage articlesData={articlesData} />;
};

export default WithRedirectIfLoggedOut(PostsPage);
