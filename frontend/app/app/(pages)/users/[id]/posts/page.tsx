"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import { Text } from "@chakra-ui/react";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import { useGetUserPortfoliosByUserId } from "@/app/hooks/swr/portfolio/userPortfolio/useGetUserPortfoliosByUserId";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const UserIdPostsPage: React.FC = () => {
  const pathname = usePathname();
  const newPathname = pathname.replace(/\/posts$/, "");
  const id = getIdOrTriggerNotFound({ pathname: newPathname, routeKey: "users" });
  const { portfoliosData, error, errorStatus, isLoading } =
    useGetUserPortfoliosByUserId(id);

  if (errorStatus) {
    return <Error statusCode={errorStatus} />;
  }

  if (error || !portfoliosData) {
    return (
      <CenteredBox>
        <GoBackLink />
      </CenteredBox>
    );
  }

  if (isLoading) {
    return (
      <CenteredBox>
        <LoadingSpinner />
      </CenteredBox>
    );
  }

  if (portfoliosData && portfoliosData.length == 0) {
    return (
      <CenteredBox>
        <GoBackLink />
        <Text>まだ投稿がありません</Text>
      </CenteredBox>
    );
  }

  return (
    <CenteredBox>
      <GoBackLink />
      {portfoliosData.map((portfolioData, i) => (
        <ArticleCard articleData={portfolioData} linkOptions={{ body: true }} key={i} />
      ))}
    </CenteredBox>
  );
};

export default UserIdPostsPage;
