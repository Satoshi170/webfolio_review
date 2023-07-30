import axios, { AxiosInstance } from "axios";

jest.mock("axios", () => {
  const mockPost = jest.fn();
  const mockGet = jest.fn();
  const mockPatch = jest.fn();
  const mockDelete = jest.fn();
  const mockIsAxiosError = jest.fn();

  return {
    create: jest.fn(() => ({
      get: mockGet.mockResolvedValue({ data: {}, headers: {} }),
      post: mockPost.mockResolvedValue({ data: {}, headers: {} }),
      patch: mockPatch.mockResolvedValue({ data: {}, headers: {} }),
      delete: mockDelete.mockResolvedValue({ data: {}, headers: {} })
    })),
    isAxiosError: mockIsAxiosError
  };
});

export const mockAxios = axios as jest.Mocked<typeof axios>;
export const mockApi: jest.Mocked<AxiosInstance> = mockAxios.create() as jest.Mocked<
  typeof axios
>;
