import axios from "axios";

import { GetPortfoliosByIdSuccessData } from "@/app/types/axios/portfolio/getPortfoliosById";

import api from "../api";

interface ApiResponse {
  status: number;
  response: GetPortfoliosByIdSuccessData | null;
}

export const getPortfoliosById = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.get<GetPortfoliosByIdSuccessData>(`/portfolios/${id}`);
    return { status: response.status, response: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { status: error.response.status, response: null };
    } else {
      throw error;
    }
  }
};
