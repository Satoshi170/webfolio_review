"use client";

import { Text } from "@chakra-ui/react";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { useGetLikedArticles } from "@/app/features/me/hooks/useGetLikedArticles";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
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
      <CenteredBox>
        <Text>読み込みに失敗しました</Text>
        <GoBackLink />
      </CenteredBox>
    );
  }

  if (articlesData) {
    if (articlesData.length == 0) {
      return (
        <CenteredBox>
          <Text>まだ投稿をいいねしていません</Text>
        </CenteredBox>
      );
    } else {
      return (
        <CenteredBox>
          {articlesData.map((portfolioData, i) => (
            <ArticleCard
              articleData={portfolioData}
              linkOptions={{ header: true, body: true }}
              key={i}
            />
          ))}
        </CenteredBox>
      );
    }
  }
};

export default WithRedirectIfLoggedOut(UserLikesPage);
