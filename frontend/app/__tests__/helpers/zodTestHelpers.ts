import type { ZodSchema } from "zod";

export interface getErrorMessagesProps<T extends Record<string, unknown>> {
  schema: ZodSchema;
  data: T;
  field: string;
}

export const getErrorMessages = <T extends Record<string, unknown>>({
  schema,
  data,
  field
}: getErrorMessagesProps<T>) => {
  const result = schema.safeParse(data);
  return result.success ? [] : result.error.flatten().fieldErrors[field] || [];
};
