import { render, screen } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { mockNavigation } from "@/__tests__/mocks/mockNavigation";
import mockRecoil from "@/__tests__/mocks/mockRecoil";
import PostCard from "@/app/components/organisms/post/PostCard";
import { loginState } from "@/app/stores/atoms/loginState";

jest.mock("next/navigation", () => mockNavigation);

jest.mock("@/app/components/molecules/actionButtons/post/OptionMenuButton", () => {
  const MockedOptionPostMenuButton: React.FC = () => {
    return <button data-testid="mocked-option-post-menu-button">MockedButton</button>;
  };

  return MockedOptionPostMenuButton;
});

describe("<PostCard/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("isLink", () => {
    describe("isLinkがtrueの場合", () => {
      it("<CardBody/ >がaタグとしてレンダリングされる", () => {
        render(
          mockRecoil(
            [{ atom: loginState, value: { isLogin: false, data: null } }],
            <PostCard portfolioData={validPortfolioData} isLink={true} />
          )
        );
        const anchorElement = screen.getByRole("link");
        expect(anchorElement).toHaveAttribute("href", `/post/${validPortfolioData.id}`);
      });
    });

    describe("isLinkがfalseの場合", () => {
      it("<CardBody/ >がaタグとしてレンダリングされない", () => {
        render(
          mockRecoil(
            [{ atom: loginState, value: { isLogin: false, data: null } }],
            <PostCard portfolioData={validPortfolioData} isLink={false} />
          )
        );
        const anchorElement = screen.queryByRole("link");
        expect(anchorElement).toBeNull();
      });
    });
  });

  describe("isUserPost", () => {
    describe("isLoginがtrueの場合", () => {
      describe("data.idとportfolioData.user.idが一致する場合", () => {
        it("<OptionPostMenuButton />がレンダリングされる", () => {
          const portfolioOwnerData = { ...validUserData, id: validPortfolioData.user.id };
          render(
            mockRecoil(
              [{ atom: loginState, value: { isLogin: true, data: portfolioOwnerData } }],
              <PostCard portfolioData={validPortfolioData} />
            )
          );
          const optionButtonElement = screen.queryByTestId(
            "mocked-option-post-menu-button"
          );
          expect(optionButtonElement).toBeInTheDocument();
        });
      });

      describe("data.idとportfolioData.user.idが一致しない場合", () => {
        it("<OptionPostMenuButton />がレンダリングされない", () => {
          const nonOwnerUserData = {
            ...validUserData,
            id: validPortfolioData.user.id + 1
          };
          render(
            mockRecoil(
              [{ atom: loginState, value: { isLogin: true, data: nonOwnerUserData } }],
              <PostCard portfolioData={validPortfolioData} />
            )
          );
          const optionButtonElement = screen.queryByTestId(
            "mocked-option-post-menu-button"
          );
          expect(optionButtonElement).toBeNull();
        });
      });
    });

    describe("isLoginがfalseの場合", () => {
      it("<OptionPostMenuButton />がレンダリングされない", () => {
        render(
          mockRecoil(
            [{ atom: loginState, value: { isLogin: false, data: null } }],
            <PostCard portfolioData={validPortfolioData} />
          )
        );
        const optionButtonElement = screen.queryByTestId("option-post-menu-button");
        expect(optionButtonElement).toBeNull();
      });
    });
  });
});
