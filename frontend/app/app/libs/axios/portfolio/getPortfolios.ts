import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { GetPortfoliosData } from "@/app/types/axios/portfolio/getPortfolios";

import api from "../api";

export const getPortfolios = async (): Promise<GetPortfoliosData> => {
  try {
    const response = await api.get<GetPortfoliosData>("/portfolios");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(UNEXPECTED_ERROR_MESSAGE);
    } else {
      throw error;
    }
  }
};
