import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { MessageModalButtonProps } from "../modals/message-modal";

interface InitialState {
  status: boolean;
  data: {
    message: string;
    buttons: Array<MessageModalButtonProps> | null;
    useHtml: boolean;
  };
}

const initialState: InitialState = {
  status: false,
  data: {
    message: "",
    buttons: null,
    useHtml: false,
  },
};

interface OpenMessageModalParam {
  message: string;
  useHtml?: boolean;
  buttons: Array<MessageModalButtonProps>;
}

export const messageModalSlice = createSlice({
  name: "messageModalSlice",
  initialState,
  reducers: {
    openMessageModal: (state, action: PayloadAction<OpenMessageModalParam>) => {
      const { message, buttons, useHtml } = action.payload;

      state.status = true;

      state.data.message = message;
      state.data.buttons = buttons;
      state.data.useHtml = useHtml ?? false;
    },

    closeMessageModal: (state) => {
      state.status = false;
      state.data.message = "";
      state.data.buttons = null;
      state.data.useHtml = false;
    },
  },
});

export const selectMessageModal = (state: RootState) => state.messageModal;

export const { openMessageModal, closeMessageModal } =
  messageModalSlice.actions;

export default messageModalSlice.reducer;
