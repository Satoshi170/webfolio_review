import { render } from "@testing-library/react";
import { RecoilRoot, MutableSnapshot, RecoilState } from "recoil";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import Header from "@/app/components/organisms/Header";
import { loginState, LoginState } from "@/app/stores/atoms/loginState";

jest.mock("@/app/components/molecules/LoggedInHeaderRightSection", () => {
  return function MockedLoggedInHeaderRightSection() {
    return <div>Mocked Logged In</div>;
  };
});

jest.mock("@/app/components/molecules/LoggedOutHeaderRightSection", () => {
  return function MockedLoggedOutHeaderRightSection() {
    return <div>Mocked Logged Out</div>;
  };
});

const initializeLoginState =
  (state: RecoilState<LoginState>, value: LoginState) =>
  ({ set }: MutableSnapshot) =>
    set(state, value);

describe("<Header />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("isLoginがtrueの時LoggedInHeaderRightSectionが表示されていること", () => {
    const { getByText } = render(
      <RecoilRoot
        initializeState={initializeLoginState(loginState, {
          isLogin: true,
          userData: validUserData
        })}
      >
        <Header />
      </RecoilRoot>
    );

    expect(getByText("Mocked Logged In")).toBeInTheDocument();
  });

  it("isLoginがfalseの時LoggedOutHeaderRightSectionが表示されていること", () => {
    const { getByText } = render(
      <RecoilRoot
        initializeState={initializeLoginState(loginState, {
          isLogin: false,
          userData: null
        })}
      >
        <Header />
      </RecoilRoot>
    );

    expect(getByText("Mocked Logged Out")).toBeInTheDocument();
  });
});
