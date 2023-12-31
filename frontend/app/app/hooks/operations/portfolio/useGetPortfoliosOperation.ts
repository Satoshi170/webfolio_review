import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { NonEmptyArray } from "ts-essentials";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { getPortfolios } from "@/app/libs/axios/portfolio/getPortfolios";
import { portfolioDataState } from "@/app/stores/atoms/portfolioDataState";
import { toastState } from "@/app/stores/atoms/toastState";

export const useGetPortfoliosOperation = (ids?: number[]) => {
  const setToast = useSetRecoilState(toastState);
  const [PortfoliosData, setPortfoliosData] = useRecoilState(portfolioDataState);

  useEffect(() => {
    if (ids && ids.length === 0) {
      return;
    }

    const getPortfoliosOperation = async () => {
      try {
        const portfolios = await getPortfolios(ids as NonEmptyArray<number>);
        setPortfoliosData(portfolios.data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : UNEXPECTED_ERROR_MESSAGE;
        setToast({
          message: errorMessage,
          status: "error",
          timestamp: Date.now()
        });
      }
    };
    void getPortfoliosOperation();
  }, [setPortfoliosData, setToast]);

  return PortfoliosData;
};
