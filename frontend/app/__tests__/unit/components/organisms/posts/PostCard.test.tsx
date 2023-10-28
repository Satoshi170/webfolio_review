import { render, screen } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import mockRecoil from "@/__tests__/mocks/mockRecoil";
import PostCard from "@/app/components/organisms/posts/PostCard";
import { loginState } from "@/app/stores/atoms/loginState";

jest.mock("@/app/components/molecules/posts/PostCardHeader", () => {
  interface Props {
    isUserPost: boolean;
  }

  const MockedPostCardHeader: React.FC<Props> = ({ isUserPost }) => {
    return <div data-testid="mockedPostCardHeader" data-isuserpost={isUserPost}></div>;
  };

  return MockedPostCardHeader;
});

jest.mock("@/app/components/molecules/posts/PostCardFooter", () => {
  const MockedPostCardFooter: React.FC = () => {
    return <div>MockedPostCardFooter</div>;
  };

  return MockedPostCardFooter;
});

describe("<PostCard/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("isUserPost", () => {
    describe("isLoginがtrueの場合", () => {
      describe("data.idとportfolioData.user.idが一致する場合", () => {
        it("isUserPostはtrueである", () => {
          const portfolioOwnerData = { ...validUserData, id: validPortfolioData.user.id };
          render(
            mockRecoil(
              [
                {
                  atom: loginState,
                  value: { isLogin: true, userData: portfolioOwnerData }
                }
              ],
              <PostCard portfolioData={validPortfolioData} />
            )
          );
          const headerElement = screen.getByTestId("mockedPostCardHeader");
          expect(headerElement.getAttribute("data-isuserpost")).toBe("true");
        });
      });

      describe("data.idとportfolioData.user.idが一致しない場合", () => {
        it("isUserPostはfalseである", () => {
          const nonOwnerUserData = {
            ...validUserData,
            id: validPortfolioData.user.id + 1
          };
          render(
            mockRecoil(
              [
                { atom: loginState, value: { isLogin: true, userData: nonOwnerUserData } }
              ],
              <PostCard portfolioData={validPortfolioData} />
            )
          );
          const headerElement = screen.getByTestId("mockedPostCardHeader");
          expect(headerElement.getAttribute("data-isuserpost")).toBe("false");
        });
      });
    });

    describe("isLoginがfalseの場合", () => {
      it("isUserPostはfalseである", () => {
        render(
          mockRecoil(
            [{ atom: loginState, value: { isLogin: false, userData: null } }],
            <PostCard portfolioData={validPortfolioData} />
          )
        );
        const headerElement = screen.getByTestId("mockedPostCardHeader");
        expect(headerElement.getAttribute("data-isuserpost")).toBe("false");
      });
    });
  });
});
