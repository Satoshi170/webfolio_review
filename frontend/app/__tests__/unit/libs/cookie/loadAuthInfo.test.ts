import Cookies from "js-cookie";

import { addAuthInfoToRequest } from "@/app/libs/cookie/loadAuthInfo";

jest.mock("js-cookie");

describe("addAuthInfoToRequest", () => {
  it("リクエストヘッダーに認証情報を追加する", () => {
    const mockConfig = { headers: {} };
    const mockToken = "mock-token";
    const mockClient = "mock-client";
    const mockUid = "mock-uid";

    (Cookies.get as jest.Mock).mockImplementation((key) => {
      switch (key) {
        case "access-token":
          return mockToken;
        case "client":
          return mockClient;
        case "uid":
          return mockUid;
        default:
          return null;
      }
    });

    const result = addAuthInfoToRequest(mockConfig);
    result.headers = result.headers || {};
    expect(result.headers["access-token"]).toBe(mockToken);
    expect(result.headers["client"]).toBe(mockClient);
    expect(result.headers["uid"]).toBe(mockUid);
  });
});
