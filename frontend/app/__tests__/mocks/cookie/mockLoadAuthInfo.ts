import type { AxiosRequestConfig } from "axios";

export const mockAddAuthInfoToRequest = (
  mockConfig?: AxiosRequestConfig
): AxiosRequestConfig => {
  const newConfig: AxiosRequestConfig = {
    ...mockConfig,
    headers: {
      "access-token": "mock-token",
      client: "mock-client",
      uid: "mock-uid",
      ...mockConfig?.headers
    }
  };
  return newConfig;
};
