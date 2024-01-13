import { UNEXPECTED_ERROR_MESSAGE } from "../constants/errors/Messages";

export const resolveErrorMessage = (e: unknown) => {
  const errorMessage = e instanceof Error ? e.message : UNEXPECTED_ERROR_MESSAGE;
  return errorMessage;
};
