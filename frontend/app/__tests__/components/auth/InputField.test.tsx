import { render, screen } from "@testing-library/react";
import { FieldError } from "react-hook-form";

import InputField, { InputFieldProps } from "@/app/components/auth/InputField";

interface TestFormValues {
  testInput: string;
}
const registerMock = jest.fn();

const props: InputFieldProps<TestFormValues> = {
  name: "testInput",
  label: "Test Input",
  register: registerMock
};

describe("<InputField />", () => {
  it("正しく名前、ラベルが反映されること", () => {
    render(<InputField {...props} />);
    const inputElement = screen.getByLabelText(/Test Input\*/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("id", "testInput");
  });

  it("register関数が正しい名前で呼び出されること", () => {
    render(<InputField {...props} />);
    expect(registerMock).toHaveBeenCalledWith("testInput");
  });

  it("propsにtypeが含まれていない場合、デフォルトでtextタイプになること", () => {
    render(<InputField {...props} />);
    const inputElement = screen.getByLabelText(/Test Input\*/i);
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("propsにtypeにpasswordが指定された場合、passwordタイプになること", () => {
    const passwordProps = { ...props, type: "password" };
    render(<InputField {...passwordProps} />);
    const inputElement = screen.getByLabelText(/Test Input\*/i);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("エラーがない場合、エラーメッセージは表示されないこと", () => {
    render(<InputField {...props} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("エラーメッセージが適切に表示されること", () => {
    const error: FieldError = { type: "test", message: "Test Error" };
    render(<InputField {...props} error={error} />);
    const errorMessage = screen.getByText("Test Error");
    expect(errorMessage.closest("div")).toHaveClass("chakra-form__error-message");
  });
});
