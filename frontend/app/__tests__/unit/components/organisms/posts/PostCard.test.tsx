import { render, screen } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import PostCard from "@/app/components/organisms/posts/PostCard";

jest.mock("@/app/hooks/recoil/loginState/useGetLoginState");
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
          (useGetLoginState as jest.Mock).mockReturnValue({
            isLogin: true,
            userData: portfolioOwnerData
          });

          render(<PostCard portfolioData={validPortfolioData} />);
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

          (useGetLoginState as jest.Mock).mockReturnValue({
            isLogin: true,
            userData: nonOwnerUserData
          });

          render(<PostCard portfolioData={validPortfolioData} />);
          const headerElement = screen.getByTestId("mockedPostCardHeader");
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

        render(<PostCard portfolioData={validPortfolioData} />);
        const headerElement = screen.getByTestId("mockedPostCardHeader");
        expect(headerElement.getAttribute("data-isuserpost")).toBe("false");
      });
    });
  });
});
