import { useCallback, useRef } from "react";

import type { MutableRefObject} from "react";

type UseImageInputReturnType = {
  fileInput: MutableRefObject<HTMLInputElement | null>;
  triggerFileSelect: () => void;
};

const useInputImageField = (): UseImageInputReturnType => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const triggerFileSelect = useCallback(() => {
    fileInput.current && fileInput.current.click();
  }, []);

  return { fileInput, triggerFileSelect };
};

export default useInputImageField;
