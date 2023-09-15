export const replaceMock = jest.fn();

export const mockNavigation = {
  useRouter: () => ({
    replace: replaceMock
  })
};
