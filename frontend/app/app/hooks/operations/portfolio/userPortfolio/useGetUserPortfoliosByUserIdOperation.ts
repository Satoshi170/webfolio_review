import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { getUserPortfoliosByUserId } from "@/app/libs/axios/portfolio/userPortfolio/getUserPortfoliosByUserId";
import { toastState } from "@/app/stores/atoms/toastState";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";

export const useGetUserPortfoliosByUserIdOperation = (pathname: string) => {
  const setToast = useSetRecoilState(toastState);
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
        setToast({
          message: UNEXPECTED_ERROR_MESSAGE,
          status: "error",
          timestamp: Date.now()
        });
      }
    };
    void getUserPortfoliosByUserIdOperation(id);
  }, [id, setToast]);
  return { status, portfoliosData };
};
