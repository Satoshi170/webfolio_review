import { render } from "@testing-library/react";
import { RecoilRoot, MutableSnapshot, RecoilState } from "recoil";

import Header from "@/app/components/Header";
import { loginState, Login } from "@/app/stores/atoms/loginState";

const initializeLoginState =
  (state: RecoilState<Login>, value: Login) =>
  ({ set }: MutableSnapshot) =>
    set(state, value);

describe("<Header />", () => {
  it("isLoginがtrueの時LoggedInHeaderRightSectionが表示されていること", () => {
    const { getByTestId } = render(
      <RecoilRoot
        initializeState={initializeLoginState(loginState, { isLogin: true, data: null })}
      >
        <Header />
      </RecoilRoot>
    );

    expect(getByTestId("logged-in-header")).toBeInTheDocument();
  });

  it("isLoginがfalseの時LoggedOutHeaderRightSectionが表示されていること", () => {
    const { getByTestId } = render(
      <RecoilRoot
        initializeState={initializeLoginState(loginState, { isLogin: false, data: null })}
      >
        <Header />
      </RecoilRoot>
    );

    expect(getByTestId("logged-out-header")).toBeInTheDocument();
  });
});
