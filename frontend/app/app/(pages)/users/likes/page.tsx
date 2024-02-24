"use client";

import { Text } from "@chakra-ui/react";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import { useGetLikedPortfolios } from "@/app/hooks/swr/me/useGetLikedPortfolios";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const UserLikesPage: React.FC = () => {
  const { portfoliosData, error, isLoading } = useGetLikedPortfolios();

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

  if (portfoliosData) {
    if (portfoliosData.length == 0) {
      return (
        <CenteredBox>
          <Text>まだ投稿をいいねしていません</Text>
        </CenteredBox>
      );
    } else {
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
    }
  }
};

export default WithRedirectIfLoggedOut(UserLikesPage);
