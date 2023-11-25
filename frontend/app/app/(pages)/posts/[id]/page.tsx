"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/posts/PostCard";
import PostCommentCard from "@/app/components/organisms/posts/comments/PostCommentCard";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";
import { CommentContext } from "@/app/hooks/datas/useCommentData";
import { PortfolioContext } from "@/app/hooks/datas/usePortfolioData";
import { useGetPortfoliosByIdOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosByIdOperation";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";

const PostsIdPage: React.FC = () => {
  const pathname = usePathname();
  const id = getIdOrTriggerNotFound({ pathname, routeKey: "posts" });
  const { status, portfolioData } = useGetPortfoliosByIdOperation(id);
  const comments = portfolioData?.comments;

  if (!status) {
    return (
      <CenteredBox>
        <LoadingSpinner />
      </CenteredBox>
    );
  }

  if (status === 200 && portfolioData) {
    return (
      <CenteredBox>
        <PortfolioContext.Provider value={portfolioData}>
          <GoBackLink />
          <PostCard portfolioData={portfolioData} linkOptions={{ header: true }} />
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
  } else {
    return <Error statusCode={status} />;
  }
};

export default PostsIdPage;
