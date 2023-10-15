import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { getPortfoliosById } from "@/app/libs/axios/portfolio/getPortfoliosById";
import { toastState } from "@/app/stores/atoms/toastState";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const useGetPortfoliosByIdOperation = (pathname: string) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const setToast = useSetRecoilState(toastState);
  let id: number | undefined = undefined;

  const match = pathname.match(/\/post\/(\d+)/);

  if (match && match[1] && /^\d+$/.test(match[1])) {
    const newPostId = Number(match[1]);
    id = newPostId;
  } else {
    notFound();
  }

  if (typeof id !== "number") {
    notFound();
  }

  useEffect(() => {
    if (typeof id === "number") {
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
    }
  }, [id, setPortfolioData, setToast]);
  return { status: status, portfolioData: portfolioData };
};
