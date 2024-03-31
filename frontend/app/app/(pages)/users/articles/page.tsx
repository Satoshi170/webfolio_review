"use client";

import { Text } from "@chakra-ui/react";

import ArticleCardsGridList from "@/app/features/articles/components/ArticleCardsGridList";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { useGetMyArticles } from "@/app/features/me/hooks/useGetMyArticles";
import { GoBackLink, LoadingSpinner } from "@/app/components/atoms";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const UserArticlesPage: React.FC = () => {
  const { articlesData, isLoading, error } = useGetMyArticles();

  if (isLoading) {
    return (
      <CenteredBox>
        <LoadingSpinner />
      </CenteredBox>
    );
  }

  if (error) {
    return (
      <CenteredBox centerContent>
        <Text>読み込みに失敗しました</Text>
        <GoBackLink />
      </CenteredBox>
    );
  }

  if (articlesData) {
    if (articlesData.length == 0) {
      return (
        <CenteredBox centerContent>
          <Text>まだ投稿を作成していません</Text>
        </CenteredBox>
      );
    } else {
      return (
        <CenteredBox>
          <ArticleCardsGridList articlesData={articlesData} />
        </CenteredBox>
      );
    }
  }
};

export default WithRedirectIfLoggedOut(UserArticlesPage);
