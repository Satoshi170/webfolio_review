import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
});

applyCaseMiddleware(api, options);

export default api;
