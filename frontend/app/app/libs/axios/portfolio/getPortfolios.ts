import axios from "axios";
import { NonEmptyArray } from "ts-essentials";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { GetPortfoliosData } from "@/app/types/axios/portfolio/getPortfolios";

import api from "../api";

export const getPortfolios = async (
  ids?: NonEmptyArray<number>
): Promise<GetPortfoliosData> => {
  const params = ids ? { id: ids } : undefined;
  try {
    const response = await api.get<GetPortfoliosData>("/portfolios", { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(UNEXPECTED_ERROR_MESSAGE);
    } else {
      throw error;
    }
  }
};
