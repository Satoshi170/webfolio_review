import { signUpValidationErrorMessages } from "../signUp/Messages";

export const patchAuthValidationErrorMessages = {
  nameTooLong: signUpValidationErrorMessages.nameTooLong,
  imageTooLarge: "画像は2MB以内である必要があります",
  invalidImageType: "ファイル形式はJPEGかPNGである必要があります"
};
