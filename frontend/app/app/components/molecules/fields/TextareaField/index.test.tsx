import { render, screen } from "@testing-library/react";

import type { TextareaFieldProps } from "@/app/components/molecules/fields/TextareaField";
import type { FieldError } from "react-hook-form";

import { TextareaField } from ".";

interface TestFormValues {
  testInput: string;
}
const mockRegister = jest.fn();

const props: TextareaFieldProps<TestFormValues> = {
  name: "testInput",
  label: "テスト",
  register: mockRegister
};

describe("<TextAreaField />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("正しく名前が反映されること", () => {
    render(<TextareaField {...props} />);
    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveAttribute("id", props.name);
  });

  it("register関数が正しい名前で呼び出されること", () => {
    render(<TextareaField {...props} />);
    expect(mockRegister).toHaveBeenCalledWith("testInput");
  });

  it("エラーがない場合、エラーメッセージは表示されないこと", () => {
    render(<TextareaField {...props} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("エラーメッセージが適切に表示されること", () => {
    const error: FieldError = { type: "test", message: "Test Error" };
    render(<TextareaField {...props} error={error} />);
    const errorMessage = screen.getByText("Test Error");
    expect(errorMessage.closest("div")).toHaveClass("chakra-form__error-message");
  });
});
