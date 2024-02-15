import Cookies from "js-cookie";

import type { AxiosRequestConfig } from "axios";

const addAuthInfoToRequest = (config: AxiosRequestConfig) => {
  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  config.headers = config.headers || {};
  config.headers["access-token"] = token;
  config.headers["client"] = client;
  config.headers["uid"] = uid;

  return config;
};

export default addAuthInfoToRequest;
