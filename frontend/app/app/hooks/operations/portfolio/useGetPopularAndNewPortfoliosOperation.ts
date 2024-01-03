import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { getLatestPortfolios } from "@/app/libs/axios/portfolio/latestPortfolios/getLatestPortfolios";
import { getPopularPortfolios } from "@/app/libs/axios/portfolio/popularPortfolios/getPopularPortfolios";
import { latestPortfoliosDataState } from "@/app/stores/atoms/portfolio/latestPortfoliosState";
import { popularPortfoliosDataState } from "@/app/stores/atoms/portfolio/popularPortfoliosState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";

export const useGetPopularAndNewPortfoliosOperation = () => {
  const { setErrorToast } = useSetToastState();
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
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      }
    };
    void getPortfoliosOperation();
  }, [setPopularPortfoliosData, setLatestPortfoliosData, setErrorToast]);

  return { latestPortfoliosData, popularPortfoliosData };
};
