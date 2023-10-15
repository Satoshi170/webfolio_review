export const replaceMock = jest.fn();
export const mockNotFound = jest.fn();

export const mockNavigation = {
  useRouter: () => ({
    replace: replaceMock
  }),
  notFound: mockNotFound
};
