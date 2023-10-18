import { render, screen } from "@testing-library/react";

import SubmitButton from "@/app/components/atoms/SubmitButton";

describe("<SubmitButton />", () => {
  it("レンダリングされ、与えられたtextが表示される", () => {
    render(<SubmitButton text="Submit" isLoading={false} isDisabled={false} />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("isLoadingがtrueのときにボタンがローディング状態を表示する", () => {
    render(<SubmitButton text="Submit" isLoading={true} isDisabled={false} />);
    const spinner = screen.getByText("Loading...");
    expect(spinner).toBeInTheDocument();
  });

  it("isLoadingがfalseのときにボタンがローディング状態を表示しない", () => {
    render(<SubmitButton text="Submit" isLoading={false} isDisabled={false} />);
    const spinner = screen.queryByText("Loading...");
    expect(spinner).not.toBeInTheDocument();
  });

  it("isDisabledがtrueのときにボタンが無効化される", () => {
    render(<SubmitButton text="Submit" isLoading={false} isDisabled={true} />);
    const button = screen.getByText("Submit");
    expect(button).toBeDisabled();
  });

  it("isDisabledがfalseのときにボタンが有効化される", () => {
    render(<SubmitButton text="Submit" isLoading={false} isDisabled={false} />);
    const button = screen.getByText("Submit");
    expect(button).not.toBeDisabled();
  });
});
