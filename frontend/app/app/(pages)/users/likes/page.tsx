"use client";

import { Text } from "@chakra-ui/react";
import { Suspense } from "react";

import WithRedirectIfLoggedOut from "@/app/components/HOCs/WithRedirectIfLoggedOut";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/posts/PostCard";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";
import { useGetPortfoliosOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosOperation";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import { LoggedInState } from "@/app/stores/atoms/loginState";

const UserLikesPage: React.FC = () => {
  const { userData } = useGetLoginState() as LoggedInState;

  const ids = userData.goods.map((obj) => obj.portfolioId);
  const portfoliosData = useGetPortfoliosOperation(ids);

  if (ids.length === 0) {
    return (
      <CenteredBox>
        <Text>まだ投稿をいいねしていません</Text>
      </CenteredBox>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CenteredBox>
        {portfoliosData.map((portfolioData, i) => (
          <PostCard
            portfolioData={portfolioData}
            linkOptions={{ header: true, body: true }}
            key={i}
          />
        ))}
      </CenteredBox>
    </Suspense>
  );
};

export default WithRedirectIfLoggedOut(UserLikesPage);
