import { render } from "@testing-library/react";

import { userData } from "@/__tests__/fixtures/auth/userData";
import { mockNavigation, replaceMock } from "@/__tests__/mocks/mockNavigation";
import mockRecoil from "@/__tests__/mocks/mockRecoil";
import WithRedirectIfLoggedIn from "@/app/components/hoc/WithRedirectIfLoggedIn";
import { loginState } from "@/app/stores/atoms/loginState";

const DummyComponent: React.FC = () => {
  return <div>Dummy Component</div>;
};

jest.mock("next/navigation", () => mockNavigation);

describe("WithRedirectIfLoggedIn", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("isLoginがtrueの時リダイレクトされる", () => {
    const WrappedComponent = WithRedirectIfLoggedIn(DummyComponent);
    render(
      mockRecoil(
        [{ atom: loginState, value: { isLogin: true, data: userData } }],
        <WrappedComponent />
      )
    );

    expect(replaceMock).toHaveBeenCalledWith("/");
  });

  it("isLoginがfalseの時コンポーネントがレンダリングされる", () => {
    const WrappedComponent = WithRedirectIfLoggedIn(DummyComponent);
    const { getByText } = render(
      mockRecoil(
        [{ atom: loginState, value: { isLogin: false, data: null } }],
        <WrappedComponent />
      )
    );

    expect(getByText("Dummy Component")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
