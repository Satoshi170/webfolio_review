import { fireEvent, render } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import WithSignInAlert from ".";

jest.mock("@/app/hooks/recoil/loginState/useGetLoginState");
jest.mock("./sections/SignInAlertModal");

const mockOnClick = jest.fn();

describe("WithSignInAlert", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  interface Props {
    onClick: () => void;
    text: string;
  }

  const DummyButtonComponent: React.FC<Props> = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  const DummyWrappedComponent = WithSignInAlert(DummyButtonComponent);

  describe("isLoginがtrueの時", () => {
    it("クリックした時にmockOnClickが呼び出される", () => {
      (useGetLoginState as jest.Mock).mockReturnValue({
        isLogin: true,
        userData: validUserData
      });
      const { getByText } = render(
        <DummyWrappedComponent onClick={mockOnClick} text="test" />
      );
      fireEvent.click(getByText("test"));
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe("isLoginがfalseの時", () => {
    it("クリックした時にmockOnClickが呼び出されない", () => {
      (useGetLoginState as jest.Mock).mockReturnValue({ isLogin: false, userData: null });

      const { getByText } = render(
        <DummyWrappedComponent onClick={mockOnClick} text="test" />
      );
      fireEvent.click(getByText("test"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
