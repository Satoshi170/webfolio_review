import { render } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import Header from ".";

jest.mock("@/app/hooks/recoil/loginState/useGetLoginState");
jest.mock("./rightSections/loggedIn", () => {
  return function MockedLoggedInHeaderRightSection() {
    return <div>Mocked Logged In</div>;
  };
});

jest.mock("./rightSections/loggedOut", () => {
  return function MockedLoggedOutHeaderRightSection() {
    return <div>Mocked Logged Out</div>;
  };
});

describe("<Header />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("isLoginがtrueの時LoggedInHeaderRightSectionが表示されていること", () => {
    (useGetLoginState as jest.Mock).mockReturnValue({
      isLogin: true,
      userData: validUserData
    });
    const { getByText } = render(<Header />);

    expect(getByText("Mocked Logged In")).toBeInTheDocument();
  });

  it("isLoginがfalseの時LoggedOutHeaderRightSectionが表示されていること", () => {
    (useGetLoginState as jest.Mock).mockReturnValue({
      isLogin: false,
      userData: null
    });
    const { getByText } = render(<Header />);

    expect(getByText("Mocked Logged Out")).toBeInTheDocument();
  });
});
