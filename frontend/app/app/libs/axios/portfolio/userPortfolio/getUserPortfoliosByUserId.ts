import axios from "axios";

import { GetPortfoliosData } from "@/app/types/axios/portfolio/getPortfolios";

import api from "../../api";

interface ApiResponse {
  status: number;
  response: GetPortfoliosData | null;
}

export const getUserPortfoliosByUserId = async (userId: number): Promise<ApiResponse> => {
  const params = {
    userId: userId
  };

  try {
    const response = await api.get<GetPortfoliosData>("/user_portfolios", {
      params: params
    });
    return { status: response.status, response: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { status: error.response.status, response: null };
    } else {
      throw error;
    }
  }
};
