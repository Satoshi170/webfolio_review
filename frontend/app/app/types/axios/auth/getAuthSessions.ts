import type { MyData } from "../../auth";

export interface GetAuthSessionsTrueData {
  isLogin: true;
  data: MyData;
}

export interface GetAuthSessionsFalseData {
  isLogin: false;
}

export type GetAuthSessionsData = GetAuthSessionsTrueData | GetAuthSessionsFalseData;
