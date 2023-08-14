import { render, screen } from "@testing-library/react";
import { FieldError } from "react-hook-form";

import InputImageField, {
  InputImageFieldProps
} from "@/app/components/auth/InputImageField";

interface TestImageFormValues {
  image: File;
}
const mockRegister = jest.fn().mockReturnValue({ ref: jest.fn() });
const mockOnChange = jest.fn();
const mockResetImage = jest.fn();

jest.mock("@/app/hooks/forms/useInputImageField", () => ({
  __esModule: true,
  default: () => ({
    fileInput: { current: null },
    triggerFileSelect: jest.fn()
  })
}));

const mockProps: InputImageFieldProps<TestImageFormValues> = {
  name: "image",
  label: "Image Upload",
  register: mockRegister,
  onChange: mockOnChange,
  resetImage: mockResetImage,
  fileName: null
};

describe("<InputImageField/>", () => {
  it("正しく名前、ラベルが反映されること", () => {
    render(<InputImageField {...mockProps} />);
    expect(screen.getByLabelText("Image Upload")).toBeInTheDocument();
    expect(screen.getByText("ファイルを選択")).toBeInTheDocument();
  });

  describe("fileNameが存在しない時", () => {
    it("選択されたファイルが表示されないこと", () => {
      render(<InputImageField {...mockProps} />);
      expect(screen.queryByText("選択されたファイル:")).not.toBeInTheDocument();
    });

    it("button要素が1つしか存在しないこと", () => {
      const { getAllByRole } = render(<InputImageField {...mockProps} />);
      const buttons = getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });
  });

  describe("fileNameが存在する時", () => {
    const fileNameProps = { ...mockProps, fileName: "example.png" };
    it("選択されたファイルが表示されること", () => {
      render(<InputImageField {...fileNameProps} />);
      expect(screen.getByText("選択されたファイル: example.png")).toBeInTheDocument();
    });

    it("button要素が二つ存在すること", () => {
      const { getAllByRole } = render(<InputImageField {...fileNameProps} />);
      const buttons = getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });
  });

  describe("errorが存在しない時", () => {
    it("エラーメッセージは表示されないこと", () => {
      render(<InputImageField {...mockProps} />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("errorが存在する時", () => {
    const error: FieldError = { type: "test", message: "Test Error" };
    const errorProps = { ...mockProps, error: error };
    it("エラーメッセージが適切に表示されること", () => {
      render(<InputImageField {...errorProps} />);
      const errorMessage = screen.getByText("Test Error");
      expect(errorMessage.closest("div")).toHaveClass("chakra-form__error-message");
    });
  });
});
