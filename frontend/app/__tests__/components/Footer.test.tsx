import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Footer from "@/app/components/Footer";

describe("<Footer />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("現在の年が2023年の場合、著作権表示が2023年だけであること", () => {
    jest.setSystemTime(new Date(2023, 3, 1));
    const { getByText } = render(<Footer />);
    expect(getByText("2023")).toBeInTheDocument();
  });

  it("現在の年が2024年の場合、著作権表示が2023-2024であること", () => {
    jest.setSystemTime(new Date(2024, 3, 1));
    const { getByText } = render(<Footer />);
    expect(getByText("2023-2024")).toBeInTheDocument();
  });
});
