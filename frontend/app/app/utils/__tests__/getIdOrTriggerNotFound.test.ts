import { mockNavigation, mockNotFound } from "@/__tests__/mocks/mockNavigation";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";

jest.mock("next/navigation", () => mockNavigation);

describe("getIdOrTriggerNotFound", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("pathnameがrouteKeyにマッチする場合", () => {
    const routeKey = "post";
    describe("pathnameに含まれるIDが数値である場合", () => {
      const pathname = "/post/1";
      it("IDが返される", () => {
        const result = getIdOrTriggerNotFound({ pathname, routeKey });
        expect(result).toBe(1);
      });
    });

    describe("pathnameに含まれるIDが数値でない場合", () => {
      const pathname = "/post/test";
      it("notFoundが呼び出される", () => {
        getIdOrTriggerNotFound({ pathname, routeKey });
        expect(mockNotFound).toHaveBeenCalled();
      });
    });
  });

  describe("pathnameがrouteKeyにマッチしない場合", () => {
    const routeKey = "post";
    const pathname = "/other/123";
    it("notFoundが呼び出される", () => {
      getIdOrTriggerNotFound({ pathname, routeKey });
      expect(mockNotFound).toHaveBeenCalled();
    });
  });
});
