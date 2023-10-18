import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true
};

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT || "default_endpoint"}/api/v1`
});

applyCaseMiddleware(api, options);

const dateKeys = ["updatedAt", "createdAt"];

const convertDateStringsToDates = (obj: unknown): unknown => {
  if (typeof obj !== "object" || obj == null) return obj;

  for (const key in obj as Record<string, unknown>) {
    const value = (obj as Record<string, unknown>)[key];

    if (dateKeys.includes(key) && typeof value === "string") {
      (obj as Record<string, unknown>)[key] = new Date(value);
    } else if (typeof value === "object") {
      (obj as Record<string, unknown>)[key] = convertDateStringsToDates(value);
    }
  }
  return obj;
};

api.interceptors.response.use((response) => {
  convertDateStringsToDates(response.data);
  return response;
});

export default api;
