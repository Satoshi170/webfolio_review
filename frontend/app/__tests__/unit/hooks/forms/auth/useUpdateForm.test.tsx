import { act, renderHook } from "@testing-library/react";

import { validImageFile } from "@/__tests__/fixtures/auth/validPatchAuthData";
import {
  mockPatchAuthOperation,
  mockUsePatchAuthOperation
} from "@/__tests__/mocks/hooks/operations/mockUsePatchAuthOperation";
import { useUpdateAccountForm } from "@/app/hooks/forms/auth/useUpdateAccountForm";

jest.mock(
  "@/app/hooks/operations/auth/usePatchAuthOperation",
  () => mockUsePatchAuthOperation
);

describe("useUpdateAccountForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("handleImageChange", () => {
    describe("fileが存在する時", () => {
      describe("isValidatedImage(file)がtrueのとき", () => {
        it("stateが更新される", () => {
          const mockEvent = {
            target: {
              files: [validImageFile]
            }
          } as unknown as React.ChangeEvent<HTMLInputElement>;

          const { result } = renderHook(() => useUpdateAccountForm());
          act(() => {
            result.current.handleImageChange(mockEvent);
          });

          expect(result.current.imageFile).toBe(validImageFile);
          expect(result.current.fileName).toBe(validImageFile.name);
        });
      });

      describe("isValidatedImage(file)がfalseのとき", () => {
        it("stateが更新されない", () => {
          const invalidSizeImageFile = {
            ...validImageFile,
            size: 2 * 1024 * 1024 + 1
          };

          const mockEvent = {
            target: {
              files: [invalidSizeImageFile]
            }
          } as unknown as React.ChangeEvent<HTMLInputElement>;

          const { result } = renderHook(() => useUpdateAccountForm());
          act(() => {
            result.current.handleImageChange(mockEvent);
          });

          expect(result.current.imageFile).toBeNull();
          expect(result.current.fileName).toBe("");
        });
      });
    });

    describe("fileが存在しない時", () => {
      it("stateは更新されない", () => {
        const mockEvent = {
          target: {
            file: []
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        const { result } = renderHook(() => useUpdateAccountForm());
        act(() => {
          result.current.handleImageChange(mockEvent);
        });

        expect(result.current.imageFile).toBeNull();
        expect(result.current.fileName).toBe("");
      });
    });
  });

  describe("onSubmit", () => {
    describe("imageFile,nameがどちらかが存在する時", () => {
      it("PatchAuthOperationが実行される", async () => {
        const mockEvent = {
          target: {
            files: [validImageFile]
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        const { result } = renderHook(() => useUpdateAccountForm());
        await act(async () => {
          result.current.handleImageChange(mockEvent);
          expect(result.current.getValues("image")).toStrictEqual(validImageFile);
          result.current.setValue("name", "testuser");
          await result.current.onSubmit();
        });
        expect(mockPatchAuthOperation).toHaveBeenCalled();
      });
    });

    describe("imageFile,nameがどちらも存在しない時", () => {
      it("PatchAuthOperationが実行されない", async () => {
        const mockEvent = {
          target: {
            files: []
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        const { result } = renderHook(() => useUpdateAccountForm());
        await act(async () => {
          result.current.handleImageChange(mockEvent);
          expect(result.current.imageFile).toBeNull();
          await result.current.onSubmit();
        });
        expect(mockPatchAuthOperation).not.toHaveBeenCalled();
      });
    });
  });

  describe("isFormValid", () => {
    describe("errors.nameまたはerror.imageが存在する時", () => {
      it("isFormValidはfalseを返す", () => {
        const { result } = renderHook(() => useUpdateAccountForm());
        act(() => {
          result.current.setError("name", { message: "Error", type: "manual" });
        });

        expect(result.current.isFormValid).toBe(false);
      });
    });

    describe("errors.nameまたはerror.imageが存在しない時", () => {
      describe("watchedNameがnull, imageFileがundefinedの時", () => {
        it("isFormValidはfalseを返す", () => {
          const { result } = renderHook(() => useUpdateAccountForm());
          act(() => {
            result.current.setValue("name", undefined);
            result.current.imageFile = null;
          });

          expect(result.current.isFormValid).toBe(false);
        });
      });

      describe("watchedNameまたはimageFileが有効な値を持っている時", () => {
        it("isFormValidはtrueを返す", () => {
          const { result } = renderHook(() => useUpdateAccountForm());
          act(() => {
            result.current.setValue("name", "testName");
            result.current.imageFile = null;
          });

          expect(result.current.isFormValid).toBe(true);
        });
      });
    });
  });
});
