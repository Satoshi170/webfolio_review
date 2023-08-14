import { ReactNode } from "react";
import { RecoilRoot, RecoilState } from "recoil";

type RecoilStateInitializer<T> = { atom: RecoilState<T>; value: T };

function mockRecoil<T>(initialState: RecoilStateInitializer<T>[], children: ReactNode) {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        initialState.forEach(({ atom, value }) => {
          set(atom, value);
        });
      }}
    >
      {children}
    </RecoilRoot>
  );
}

export default mockRecoil;
