import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
  data: {
    onClick:
      | null
      | ((
          type: "catering" | "bulk-order-pickup" | "bulk-order-delivery"
        ) => void);
  };
}

const initialState: InitialState = {
  status: false,
  data: {
    onClick: null,
  },
};

interface OpenMessageModalParam {
  onClick: (
    type: "catering" | "bulk-order-pickup" | "bulk-order-delivery"
  ) => void;
}

export const cateringSelectTypeModalSlice = createSlice({
  name: "cateringSelectTypeModal",
  initialState,
  reducers: {
    openCateringSelectTypeModal: (
      state,
      action: PayloadAction<OpenMessageModalParam>
    ) => {
      const { onClick } = action.payload;

      state.status = true;
      state.data.onClick = onClick;
    },

    closeCateringSelectTypeModal: (state) => {
      state.status = false;
      state.data.onClick = null;
    },
  },
});

export const selectCateringSelectTypeModal = (state: RootState) =>
  state.cateringSelectTypeModal;

export const { openCateringSelectTypeModal, closeCateringSelectTypeModal } =
  cateringSelectTypeModalSlice.actions;

export default cateringSelectTypeModalSlice.reducer;
