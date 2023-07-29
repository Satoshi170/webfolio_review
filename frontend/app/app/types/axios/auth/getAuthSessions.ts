import { UserData } from "../../auth";

export interface GetAuthSessionsTrueData {
  isLogin: true;
  data: UserData;
}

export interface GetAuthSessionsFalseData {
  isLogin: false;
}

export type GetAuthSessionsData = GetAuthSessionsTrueData | GetAuthSessionsFalseData;
