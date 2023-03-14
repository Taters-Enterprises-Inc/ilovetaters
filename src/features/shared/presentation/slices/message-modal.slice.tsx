import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { MessageModalButtonProps } from "../modals/message-modal";

interface InitialState {
  status: boolean;
  data: {
    message: string;
    buttons: Array<MessageModalButtonProps> | null;
  };
}

const initialState: InitialState = {
  status: false,
  data: {
    message: "",
    buttons: null,
  },
};

interface OpenMessageModalParam {
  message: string;
  buttons: Array<MessageModalButtonProps>;
}

export const messageModalSlice = createSlice({
  name: "messageModalSlice",
  initialState,
  reducers: {
    openMessageModal: (state, action: PayloadAction<OpenMessageModalParam>) => {
      const { message, buttons } = action.payload;

      state.status = true;

      state.data.message = message;
      state.data.buttons = buttons;
    },

    closeMessageModal: (state) => {
      state.status = false;
      state.data.message = "";
      state.data.buttons = null;
    },
  },
});

export const selectMessageModal = (state: RootState) => state.messageModal;

export const { openMessageModal, closeMessageModal } =
  messageModalSlice.actions;

export default messageModalSlice.reducer;
