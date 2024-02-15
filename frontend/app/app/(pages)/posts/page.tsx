"use client";

import { Text } from "@chakra-ui/react";

import { useGetPortfolios } from "@/app/hooks/swr/portfolio/useGetPortfolios";
import WithRedirectIfLoggedOut from "@/app/components/HOCs/WithRedirectIfLoggedOut";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/posts/PostCard";
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
        <PostCard
          portfolioData={portfolioData}
          linkOptions={{ header: true, body: true }}
          key={i}
        />
      ))}
    </CenteredBox>
  );
};

export default WithRedirectIfLoggedOut(PostsPage);
