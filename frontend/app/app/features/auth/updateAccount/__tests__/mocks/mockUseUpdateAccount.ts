export const mockUpdateAccount = jest.fn();

export const mockUseUpdateAccount = {
  useUpdateAccount: () => ({
    updateAccount: mockUpdateAccount
  })
};
