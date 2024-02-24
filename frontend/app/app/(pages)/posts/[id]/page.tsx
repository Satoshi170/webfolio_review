"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import { CommentContext } from "@/app/hooks/datas/useCommentData";
import { PortfolioContext } from "@/app/hooks/datas/usePortfolioData";
import { useGetPortfoliosById } from "@/app/hooks/swr/portfolio/useGetPortfoliosById";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCommentCard from "@/app/components/organisms/posts/comments/PostCommentCard";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const PostsIdPage: React.FC = () => {
  const pathname = usePathname();
  const id = getIdOrTriggerNotFound({ pathname, routeKey: "posts" });
  const { portfolioData, error, errorStatus, isLoading } = useGetPortfoliosById(id);

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

  if (portfolioData) {
    const comments = portfolioData.comments;

    return (
      <CenteredBox>
        <PortfolioContext.Provider value={portfolioData}>
          <GoBackLink />
          <ArticleCard articleData={portfolioData} linkOptions={{ header: true }} />
          {comments &&
            comments.length >= 1 &&
            comments.map((commentData, i) => (
              <CommentContext.Provider value={commentData} key={i}>
                <PostCommentCard key={i} />
              </CommentContext.Provider>
            ))}
        </PortfolioContext.Provider>
      </CenteredBox>
    );
  }
};

export default PostsIdPage;
