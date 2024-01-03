import { useEffect, useState } from "react";

import { getPortfoliosById } from "@/app/libs/axios/portfolio/getPortfoliosById";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";

export const useGetPortfoliosByIdOperation = (id: number) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const { setUnexpectedErrorToast } = useSetToastState();
  useEffect(() => {
    const getPortfoliosByIdOperation = async (id: number) => {
      try {
        const { status, response } = await getPortfoliosById(id);
        if (status === 200 && response) {
          setPortfolioData(response.data);
        }
        setStatus(status);
      } catch (e) {
        setUnexpectedErrorToast();
      }
    };
    void getPortfoliosByIdOperation(id);
  }, [id, setPortfolioData, setUnexpectedErrorToast]);

  return { status, portfolioData };
};
