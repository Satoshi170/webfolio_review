import { createContext, useContext, useState } from "react";

import type { Dispatch, ReactNode, SetStateAction } from "react";

interface EditContextType {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

const EditModeContext = createContext<EditContextType | undefined>(undefined);

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const data = useContext(EditModeContext);

  if (!data) {
    throw new Error("useEditMode must be used within a EditModeProvider");
  }
  return data;
};
