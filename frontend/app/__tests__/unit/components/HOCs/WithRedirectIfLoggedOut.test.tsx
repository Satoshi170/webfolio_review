import { render } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { mockNavigation, replaceMock } from "@/__tests__/mocks/mockNavigation";
import WithRedirectIfLoggedOut from "@/app/components/HOCs/WithRedirectIfLoggedOut";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

jest.mock("next/navigation", () => mockNavigation);
jest.mock("@/app/hooks/recoil/loginState/useGetLoginState");

describe("WithRedirectIfLoggedOut", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  const DummyComponent: React.FC = () => {
    return <div>Dummy Component</div>;
  };

  const WrappedComponent = WithRedirectIfLoggedOut(DummyComponent);

  it("isLoginがfalseの時リダイレクトされる", () => {
    (useGetLoginState as jest.Mock).mockReturnValue({ isLogin: false, userData: null });
    render(<WrappedComponent />);
    expect(replaceMock).toHaveBeenCalledWith("/auth/sign_in");
  });

  it("isLoginがtrueの時コンポーネントがレンダリングされる", () => {
    (useGetLoginState as jest.Mock).mockReturnValue({
      isLogin: true,
      userData: validUserData
    });

    const { getByText } = render(<WrappedComponent />);
    expect(getByText("Dummy Component")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
