import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const mockPost = jest.fn().mockResolvedValue({ data: {}, headers: {} });
export const mockGet = jest.fn().mockResolvedValue({ data: {}, headers: {} });
export const mockPatch = jest.fn().mockResolvedValue({ data: {}, headers: {} });
export const mockDelete = jest.fn().mockResolvedValue({ data: {}, headers: {} });

jest.mock("axios", () => {
  const mockIsAxiosError = jest.fn();

  return {
    create: jest.fn((config?: AxiosRequestConfig) => ({
      ...config,
      get: mockGet,
      post: mockPost,
      patch: mockPatch,
      delete: mockDelete
    })) as unknown as jest.MockedFunction<
      (config?: AxiosRequestConfig) => jest.Mocked<AxiosInstance>
    >,
    isAxiosError: mockIsAxiosError
  };
});
export const mockAxios = axios as jest.Mocked<typeof axios>;
export const mockApi: jest.Mocked<AxiosInstance> = mockAxios.create() as jest.Mocked<
  typeof axios
>;
