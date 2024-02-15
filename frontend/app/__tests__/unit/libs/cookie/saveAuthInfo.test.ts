import Cookies from "js-cookie";

import { saveAuthInfoFromHeader } from "@/app/libs/cookie/saveAuthInfo";

import type { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

jest.mock("js-cookie");

describe("saveAuthInfoFromHeader", () => {
  it("ヘッダーから認証情報を取得し、クッキーに保存する", () => {
    const mockResponse: CustomAxiosResponse = {
      headers: {
        "access-token": "mockToken",
        client: "mockClient",
        uid: "mockUid"
      },
      data: {},
      status: 0,
      statusText: "OK",
      config: {} as any
    };

    const setSpy = jest.spyOn(Cookies, "set");

    saveAuthInfoFromHeader(mockResponse);

    expect(setSpy).toHaveBeenCalledWith("access-token", "mockToken", {
      secure: true,
      sameSite: "lax"
    });
    expect(setSpy).toHaveBeenCalledWith("client", "mockClient", {
      secure: true,
      sameSite: "lax"
    });
    expect(setSpy).toHaveBeenCalledWith("uid", "mockUid", {
      secure: true,
      sameSite: "lax"
    });
  });
});
