"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import { Text } from "@chakra-ui/react";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import { useGetUserArticles } from "@/app/features/articles/hooks/useGetUserArticles";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const UserIdPostsPage: React.FC = () => {
  const pathname = usePathname();
  const newPathname = pathname.replace(/\/posts$/, "");
  const id = getIdOrTriggerNotFound({ pathname: newPathname, routeKey: "users" });
  const { articlesData, error, errorStatus, isLoading } = useGetUserArticles(id);

  if (errorStatus) {
    return <Error statusCode={errorStatus} />;
  }

  if (error || !articlesData) {
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

  if (articlesData && articlesData.length == 0) {
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
      {articlesData.map((articleData, i) => (
        <ArticleCard articleData={articleData} linkOptions={{ body: true }} key={i} />
      ))}
    </CenteredBox>
  );
};

export default UserIdPostsPage;
