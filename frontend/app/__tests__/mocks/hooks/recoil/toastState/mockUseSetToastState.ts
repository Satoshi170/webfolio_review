export const mockSetSuccessToast = jest.fn();
export const mockSetErrorToast = jest.fn();
export const mockSetUnexpectedErrorToast = jest.fn();

export const mockUseSetToastState = {
  useSetToastState: () => ({
    setSuccessToast: mockSetSuccessToast,
    setErrorToast: mockSetErrorToast,
    setUnexpectedErrorToast: mockSetUnexpectedErrorToast
  })
};
