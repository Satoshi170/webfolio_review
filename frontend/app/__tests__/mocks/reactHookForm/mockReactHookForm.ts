export const mockRegister = jest.fn();
export const mockHandleSubmit = jest.fn();
export const mockSetError = jest.fn();
export const mockGetValues = jest.fn();
export const mockSetValue = jest.fn();
export const mockClearErrors = jest.fn();
export const mockWatch = jest.fn();
export const mockReset = jest.fn();
export const mockFormState = { errors: {}, isValid: false };

export const mockReactHookForm = {
  useForm: () => ({
    register: mockRegister,
    handleSubmit: mockHandleSubmit,
    setError: mockSetError,
    clearErrors: mockClearErrors,
    watch: mockWatch,
    reset: mockReset,
    formState: mockFormState
  })
};
