"use client";

import { Text } from "@chakra-ui/react";

import ArticleCardsGridList from "@/app/features/articles/components/ArticleCardsGridList";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { useGetLikedArticles } from "@/app/features/me/hooks/useGetLikedArticles";
import { GoBackLink } from "@/app/components/atoms";
import { LoadingSpinner } from "@/app/components/atoms/spinners";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const UserLikesPage: React.FC = () => {
  const { articlesData, error, isLoading } = useGetLikedArticles();

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
          <Text>まだ投稿をいいねしていません</Text>
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

export default WithRedirectIfLoggedOut(UserLikesPage);
