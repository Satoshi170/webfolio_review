"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/posts/PostCard";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";
import { useGetPortfoliosByIdOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosByIdOperation";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";

const PostPageById: React.FC = () => {
  const pathname = usePathname();
  const id = getIdOrTriggerNotFound({ pathname, routeKey: "posts" });
  const { status, portfolioData } = useGetPortfoliosByIdOperation(id);

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
        <GoBackLink />
        <PostCard portfolioData={portfolioData} linkOptions={{ header: true }} />
      </CenteredBox>
    );
  } else {
    return <Error statusCode={status} />;
  }
};

export default PostPageById;
