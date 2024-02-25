"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import ArticleCard from "@/app/features/articles/components/layouts/ArticleCard";
import { ArticleContext } from "@/app/features/articles/hooks/useArticleData";
import { useGetArticle } from "@/app/features/articles/hooks/useGetArticle";
import { CommentContext } from "@/app/hooks/datas/useCommentData";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCommentCard from "@/app/components/organisms/posts/comments/PostCommentCard";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

const PostsIdPage: React.FC = () => {
  const pathname = usePathname();
  const id = getIdOrTriggerNotFound({ pathname, routeKey: "posts" });
  const { articleData, error, errorStatus, isLoading } = useGetArticle(id);

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
    const comments = articleData.comments;

    return (
      <CenteredBox>
        <ArticleContext.Provider value={articleData}>
          <GoBackLink />
          <ArticleCard articleData={articleData} linkOptions={{ header: true }} />
          {comments &&
            comments.length >= 1 &&
            comments.map((commentData, i) => (
              <CommentContext.Provider value={commentData} key={i}>
                <PostCommentCard key={i} />
              </CommentContext.Provider>
            ))}
        </ArticleContext.Provider>
      </CenteredBox>
    );
  }
};

export default PostsIdPage;
