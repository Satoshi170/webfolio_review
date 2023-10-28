import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { getPortfoliosById } from "@/app/libs/axios/portfolio/getPortfoliosById";
import { toastState } from "@/app/stores/atoms/toastState";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const useGetPortfoliosByIdOperation = (id: number) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const setToast = useSetRecoilState(toastState);

  useEffect(() => {
    const getPortfoliosByIdOperation = async (id: number) => {
      try {
        const { status, response } = await getPortfoliosById(id);
        if (status === 200 && response) {
          setPortfolioData(response.data);
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
    void getPortfoliosByIdOperation(id);
  }, [id, setPortfolioData, setToast]);
  return { status, portfolioData };
};
