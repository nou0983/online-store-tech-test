"use client";

import { createContext, useReducer, useContext } from "react";
import modalReducer, { type ModalActionType } from "./modal-context-reducer";

// Types related to the modal context
type ModalContextType = ModalStateType & {
  dispatch: React.Dispatch<ModalActionType>;
};
type ModalProviderProps = { children: React.ReactNode };
export type HeadingType = "cart" | "checkout" | "order confirmation" | null;
export type ModalStateType = {
  heading: HeadingType;
  isOpen: boolean;
};

const initialStateModal: ModalStateType = {
  heading: null,
  isOpen: false,
};

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, initialStateModal);

  const value: ModalContextType = {
    ...state,
    dispatch,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

export { ModalProvider, useModalContext };
