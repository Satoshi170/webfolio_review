import { useEffect, useState } from "react";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { getUserPortfoliosByUserId } from "@/app/libs/axios/portfolio/userPortfolio/getUserPortfoliosByUserId";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";

export const useGetUserPortfoliosByUserIdOperation = (pathname: string) => {
  const { setUnexpectedErrorToast } = useSetToastState();
  const [status, setStatus] = useState<number | null>(null);
  const [portfoliosData, setPortfoliosData] = useState<PortfolioData[]>([]);
  const newPathname = pathname.replace(/\/posts$/, "");
  const id = getIdOrTriggerNotFound({ pathname: newPathname, routeKey: "users" });

  useEffect(() => {
    const getUserPortfoliosByUserIdOperation = async (id: number) => {
      try {
        const { status, response } = await getUserPortfoliosByUserId(id);
        if (status === 200 && response) {
          setPortfoliosData(response.data);
        }
        setStatus(status);
      } catch (e) {
        setUnexpectedErrorToast();
      }
    };
    void getUserPortfoliosByUserIdOperation(id);
  }, [id, setUnexpectedErrorToast]);
  return { status, portfoliosData };
};
