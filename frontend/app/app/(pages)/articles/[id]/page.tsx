"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import ArticleDetailPage from "@/app/features/articles/components/ArticleDetailPage";
import { useGetArticle } from "@/app/features/articles/hooks/useGetArticle";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";
import { GoBackLink } from "@/app/components/atoms/links";
import { LoadingSpinner } from "@/app/components/atoms/spinners";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const PostsIdPage: React.FC = () => {
  const pathname = usePathname();
  const id = getIdOrTriggerNotFound({ pathname, routeKey: "articles" });
  const { articleData, error, errorStatus, isLoading } = useGetArticle(id);
  const { userData } = useGetLoginState();
  if (errorStatus) {
    return <Error statusCode={errorStatus} />;
  }

  if (error) {
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

  if (articleData) {
    const isUser = userData?.id == articleData.user.id;
    return (
      <CenteredBox>
        <ArticleDetailPage articleData={articleData} isUser={isUser} />
      </CenteredBox>
    );
  }
};

export default PostsIdPage;
