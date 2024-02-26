import { render, screen } from "@testing-library/react";

import { validArticleData } from "@/__tests__/fixtures/articles/validArticleData";
import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import ArticleCard from ".";

jest.mock("@/app/hooks/recoil/loginState/useGetLoginState");
jest.mock("./header", () => {
  interface Props {
    isUserPost: boolean;
  }

  const MockedHeader: React.FC<Props> = ({ isUserPost }) => {
    return <div data-testid="header" data-isuserpost={isUserPost}></div>;
  };

  return MockedHeader;
});

jest.mock("./footer", () => {
  const MockedFooter: React.FC = () => {
    return <div>MockedFooter</div>;
  };

  return MockedFooter;
});

describe("<ArticleCard/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("isUserPost", () => {
    describe("isLoginがtrueの場合", () => {
      describe("userData.idとarticleData.user.idが一致する場合", () => {
        it("isUserPostはtrueである", () => {
          const portfolioOwnerData = { ...validUserData, id: validArticleData.user.id };
          (useGetLoginState as jest.Mock).mockReturnValue({
            isLogin: true,
            userData: portfolioOwnerData
          });

          render(<ArticleCard articleData={validArticleData} />);
          const headerElement = screen.getByTestId("header");
          expect(headerElement.getAttribute("data-isuserpost")).toBe("true");
        });
      });

      describe("userData.idとarticleData.user.idが一致しない場合", () => {
        it("isUserPostはfalseである", () => {
          const nonOwnerUserData = {
            ...validUserData,
            id: validArticleData.user.id + 1
          };

          (useGetLoginState as jest.Mock).mockReturnValue({
            isLogin: true,
            userData: nonOwnerUserData
          });

          render(<ArticleCard articleData={validArticleData} />);
          const headerElement = screen.getByTestId("header");
          expect(headerElement.getAttribute("data-isuserpost")).toBe("false");
        });
      });
    });

    describe("isLoginがfalseの場合", () => {
      it("isUserPostはfalseである", () => {
        (useGetLoginState as jest.Mock).mockReturnValue({
          isLogin: false,
          userData: null
        });

        render(<ArticleCard articleData={validArticleData} />);
        const headerElement = screen.getByTestId("header");
        expect(headerElement.getAttribute("data-isuserpost")).toBe("false");
      });
    });
  });
});
