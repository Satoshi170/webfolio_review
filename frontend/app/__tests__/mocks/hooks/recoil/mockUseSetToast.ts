export const mockSetSuccessToast = jest.fn();
export const mockSetErrorToast = jest.fn();

export const mockUseSetToast = {
  useSetToast: () => ({
    setSuccessToast: mockSetSuccessToast,
    setErrorToast: mockSetErrorToast
  })
};
