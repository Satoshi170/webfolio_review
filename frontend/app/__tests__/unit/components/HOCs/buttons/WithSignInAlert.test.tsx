import { fireEvent, render } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import mockRecoil from "@/__tests__/mocks/mockRecoil";
import WithSignInAlert from "@/app/components/HOCs/buttons/WithSignInAlert";
import { loginState } from "@/app/stores/atoms/loginState";

jest.mock("@/app/components/atoms/auth/SignInAlertModal");
const mockOnClick = jest.fn();

interface Props {
  onClick: () => void;
  text: string;
}

const DummyButtonComponent: React.FC<Props> = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};
const DummyWrappedComponent = WithSignInAlert(DummyButtonComponent);

describe("WithSignInAlert", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("isLoginがtrueの時", () => {
    it("クリックした時にmockOnClickが呼び出される", () => {
      const { getByText } = render(
        mockRecoil(
          [{ atom: loginState, value: { isLogin: true, userData: validUserData } }],
          <DummyWrappedComponent onClick={mockOnClick} text="test" />
        )
      );
      fireEvent.click(getByText("test"));
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe("isLoginがfalseの時", () => {
    it("クリックした時にmockOnClickが呼び出されない", () => {
      const { getByText } = render(
        mockRecoil(
          [{ atom: loginState, value: { isLogin: false, userData: null } }],
          <DummyWrappedComponent onClick={mockOnClick} text="test" />
        )
      );
      fireEvent.click(getByText("test"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
