export const mockSetLoginState = jest.fn();

export const mockUseSetLoginState = {
  useSetLoginState: () => ({ setLoginState: mockSetLoginState })
};
