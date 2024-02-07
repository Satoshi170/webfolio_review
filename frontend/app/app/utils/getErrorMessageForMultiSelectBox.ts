import { FieldError, Merge } from "react-hook-form";

export const getErrorMessageForMultiSelect = (
  error: Merge<FieldError, (FieldError | undefined)[]> | undefined
) => {
  if (Array.isArray(error)) {
    const fieldErrors = error as (FieldError | undefined)[];
    return fieldErrors?.[0]?.message;
  }
  return error?.message;
};
