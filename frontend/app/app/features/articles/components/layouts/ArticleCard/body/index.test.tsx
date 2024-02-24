import { Card } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";

import ArticleCardBody from ".";

describe("<ArticleCardBody />", () => {
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
            <ArticleCardBody articleData={validPortfolioData} isLink={true} />
          </Card>
        );
        const anchorElement = screen.getByRole("link");
        expect(anchorElement).toHaveAttribute("href", `/posts/${validPortfolioData.id}`);
      });
    });

    describe("isLinkがfalseの場合", () => {
      it("aタグが存在しない", () => {
        render(
          <Card>
            <ArticleCardBody articleData={validPortfolioData} isLink={false} />
          </Card>
        );
        const anchorElement = screen.queryByRole("link");
        expect(anchorElement).toBeNull();
      });
    });
  });
});
