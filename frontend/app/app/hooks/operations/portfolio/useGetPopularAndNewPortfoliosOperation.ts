import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { getLatestPortfolios } from "@/app/libs/axios/portfolio/latestPortfolios/getLatestPortfolios";
import { getPopularPortfolios } from "@/app/libs/axios/portfolio/popularPortfolios/getPopularPortfolios";
import { latestPortfoliosDataState } from "@/app/stores/atoms/portfolio/latestPortfoliosState";
import { popularPortfoliosDataState } from "@/app/stores/atoms/portfolio/popularPortfoliosState";
import { toastState } from "@/app/stores/atoms/toastState";

export const useGetPopularAndNewPortfoliosOperation = () => {
  const setToast = useSetRecoilState(toastState);
  const [popularPortfoliosData, setPopularPortfoliosData] = useRecoilState(
    popularPortfoliosDataState
  );
  const [latestPortfoliosData, setLatestPortfoliosData] = useRecoilState(
    latestPortfoliosDataState
  );

  useEffect(() => {
    const getPortfoliosOperation = async () => {
      try {
        const popularPortfolios = await getPopularPortfolios();
        const latestPortfolios = await getLatestPortfolios();
        setPopularPortfoliosData(popularPortfolios.data);
        setLatestPortfoliosData(latestPortfolios.data);
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
  }, [setPopularPortfoliosData, setLatestPortfoliosData, setToast]);

  return { latestPortfoliosData, popularPortfoliosData };
};
