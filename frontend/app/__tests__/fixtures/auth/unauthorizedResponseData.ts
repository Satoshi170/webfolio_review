import { UnauthorizedResponseData } from "@/app/types/auth";

const mockUnauthorizedResponseData: UnauthorizedResponseData = {
  errors: ["unauthorized"]
};

export const mockUnauthorizedResponse = {
  response: { status: 401, data: mockUnauthorizedResponseData }
};
