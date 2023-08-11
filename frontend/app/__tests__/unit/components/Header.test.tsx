import { render } from "@testing-library/react";
import { RecoilRoot, MutableSnapshot, RecoilState } from "recoil";

import { userData } from "@/__tests__/fixtures/auth/userData";
import Header from "@/app/components/Header";
import { loginState, LoginState } from "@/app/stores/atoms/loginState";

jest.mock("@/app/components/containers/LoggedInHeaderRightSection", () => {
  return function MockedLoggedInHeaderRightSection() {
    return <div>Mocked Logged In</div>;
  };
});

jest.mock("@/app/components/containers/LoggedOutHeaderRightSection", () => {
  return function MockedLoggedOutHeaderRightSection() {
    return <div>Mocked Logged Out</div>;
  };
});

const initializeLoginState =
  (state: RecoilState<LoginState>, value: LoginState) =>
  ({ set }: MutableSnapshot) =>
    set(state, value);

describe("<Header />", () => {
  it("isLoginがtrueの時LoggedInHeaderRightSectionが表示されていること", () => {
    const { getByText } = render(
      <RecoilRoot
        initializeState={initializeLoginState(loginState, {
          isLogin: true,
          data: userData
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
        initializeState={initializeLoginState(loginState, { isLogin: false, data: null })}
      >
        <Header />
      </RecoilRoot>
    );

    expect(getByText("Mocked Logged Out")).toBeInTheDocument();
  });
});
