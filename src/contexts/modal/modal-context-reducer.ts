import type { ModalStateType } from "./modal-context";

type ModalCloseActionType = {
  type: "modal/close";
};

type ModalOpenActionType = {
  type: "modal/open";
  payload: string;
};

export type ModalActionType = ModalCloseActionType | ModalOpenActionType;

const modalReducer = (
  state: ModalStateType,
  action: ModalActionType
): ModalStateType => {
  switch (action.type) {
    case "modal/open":
      return {
        ...state,
        heading: action.payload,
        isOpen: true,
      };
    case "modal/close":
      return {
        ...state,
        heading: "",
        isOpen: false,
      };
    default:
      throw new Error(`Unhandled action type in modalReducer`);
  }
};

export default modalReducer;
