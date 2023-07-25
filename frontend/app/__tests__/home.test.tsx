import { render, screen } from "@testing-library/react";

import Home from "../app/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const h1El = screen.getByRole("heading", { name: "Jestの動作確認" });
    expect(h1El).toBeInTheDocument();
  });
});
