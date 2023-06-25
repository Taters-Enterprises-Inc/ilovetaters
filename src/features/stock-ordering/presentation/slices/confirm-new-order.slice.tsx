import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { InsertNewOrderParam } from "features/stock-ordering/core/stock-ordering.params";

interface InitialState {
  data: InsertNewOrderParam | undefined;
}

const initialState: InitialState = {
  data: undefined,
};

export const confirmNewOrderSlice = createSlice({
  name: "confirmNewOrder",
  initialState,
  reducers: {
    confirmNewOrder: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const selectconfirmNewOrder = (state: RootState) =>
  state.confirmNewOrder;

export const { confirmNewOrder } = confirmNewOrderSlice.actions;

export default confirmNewOrderSlice.reducer;
