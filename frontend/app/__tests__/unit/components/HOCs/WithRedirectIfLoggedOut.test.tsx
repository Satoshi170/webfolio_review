import { render } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { mockNavigation, replaceMock } from "@/__tests__/mocks/mockNavigation";
import mockRecoil from "@/__tests__/mocks/mockRecoil";
import WithRedirectIfLoggedOut from "@/app/components/HOCs/WithRedirectIfLoggedOut";
import { loginState } from "@/app/stores/atoms/loginState";

const DummyComponent: React.FC = () => {
  return <div>Dummy Component</div>;
};

jest.mock("next/navigation", () => mockNavigation);

describe("WithRedirectIfLoggedOut", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("isLoginがfalseの時リダイレクトされる", () => {
    const WrappedComponent = WithRedirectIfLoggedOut(DummyComponent);
    render(
      mockRecoil(
        [{ atom: loginState, value: { isLogin: false, data: null } }],
        <WrappedComponent />
      )
    );

    expect(replaceMock).toHaveBeenCalledWith("/auth/sign_in");
  });

  it("isLoginがtrueの時コンポーネントがレンダリングされる", () => {
    const WrappedComponent = WithRedirectIfLoggedOut(DummyComponent);
    const { getByText } = render(
      mockRecoil(
        [{ atom: loginState, value: { isLogin: true, data: validUserData } }],
        <WrappedComponent />
      )
    );

    expect(getByText("Dummy Component")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
