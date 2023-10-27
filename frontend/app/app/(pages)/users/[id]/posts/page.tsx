"use client";

import Error from "next/error";
import { usePathname } from "next/navigation";

import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/posts/PostCard";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";
import { useGetUserPortfoliosByUserIdOperation } from "@/app/hooks/operations/portfolio/userPortfolio/useGetUserPortfoliosByUserIdOperation";

const UserIdPostsPage: React.FC = () => {
  const pathname = usePathname();
  const { status, portfoliosData } = useGetUserPortfoliosByUserIdOperation(pathname);

  if (!status) {
    return (
      <CenteredBox>
        <LoadingSpinner />
      </CenteredBox>
    );
  }

  if (status === 200 && portfoliosData) {
    return (
      <CenteredBox>
        <GoBackLink />
        {portfoliosData.map((portfolioData, i) => (
          <PostCard portfolioData={portfolioData} linkOptions={{ body: true }} key={i} />
        ))}
      </CenteredBox>
    );
  } else {
    return <Error statusCode={status} />;
  }
};

export default UserIdPostsPage;
