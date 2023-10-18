import { Card } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import PostCardHeader from "@/app/components/molecules/posts/PostCardHeader";

describe("<PostCardHeader />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("isLink", () => {
    describe("isLinkがtrueの場合", () => {
      it("aタグが存在する", () => {
        render(
          <Card>
            <PostCardHeader portfolioData={validPortfolioData} isLink={true} />
          </Card>
        );
        const anchorElement = screen.getByRole("link");
        expect(anchorElement).toHaveAttribute(
          "href",
          `/users/${validPortfolioData.user.id}/posts`
        );
      });
    });

    describe("isLinkがfalseの場合", () => {
      it("aタグが存在しない", () => {
        render(
          <Card>
            <PostCardHeader portfolioData={validPortfolioData} isLink={false} />
          </Card>
        );
        const anchorElement = screen.queryByRole("link");
        expect(anchorElement).toBeNull();
      });
    });
  });
});
