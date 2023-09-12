import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true
};

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
if (!baseURL) {
  throw new Error("API endpoint is not defined");
}
const api = axios.create({
  baseURL: `${baseURL}/api/v1`
});

applyCaseMiddleware(api, options);

export default api;
