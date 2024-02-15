import { render } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { mockNavigation, replaceMock } from "@/__tests__/mocks/mockNavigation";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import WithRedirectIfLoggedIn from "@/app/components/HOCs/WithRedirectIfLoggedIn";

jest.mock("next/navigation", () => mockNavigation);
jest.mock("@/app/hooks/recoil/loginState/useGetLoginState");

describe("WithRedirectIfLoggedIn", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  const DummyComponent: React.FC = () => {
    return <div>Dummy Component</div>;
  };

  const WrappedComponent = WithRedirectIfLoggedIn(DummyComponent);

  it("isLoginがtrueの時リダイレクトされる", () => {
    (useGetLoginState as jest.Mock).mockReturnValue({
      isLogin: true,
      userData: validUserData
    });
    render(<WrappedComponent />);
    expect(replaceMock).toHaveBeenCalledWith("/");
  });

  it("isLoginがfalseの時コンポーネントがレンダリングされる", () => {
    (useGetLoginState as jest.Mock).mockReturnValue({ isLogin: false, userData: null });
    const { getByText } = render(<WrappedComponent />);
    expect(getByText("Dummy Component")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
