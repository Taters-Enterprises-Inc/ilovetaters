import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RemoveItemFromCartCateringRepository,
  RemoveItemFromCartCateringResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum RemoveItemFromCartCateringState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: RemoveItemFromCartCateringState;
  message: string;
} = {
  status: RemoveItemFromCartCateringState.initial,
  message: "",
};

export const removeItemFromCartCatering = createAsyncThunk(
  "removeItemFromCartCatering",
  async (param: number) => {
    const response: RemoveItemFromCartCateringResponse =
      await RemoveItemFromCartCateringRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const removeItemFromCartCateringSlice = createSlice({
  name: "removeItemFromCartCatering",
  initialState,
  reducers: {
    resetRemoveItemFromCartCatering: (state) => {
      state.status = RemoveItemFromCartCateringState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(removeItemFromCartCatering.pending, (state: any) => {
        state.status = RemoveItemFromCartCateringState.inProgress;
      })
      .addCase(
        removeItemFromCartCatering.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = RemoveItemFromCartCateringState.success;
          state.message = message;
        }
      )
      .addCase(
        removeItemFromCartCatering.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = RemoveItemFromCartCateringState.fail;
          state.message = message;
        }
      );
  },
});

export const selectRemoveItemFromCartCatering = (state: RootState) =>
  state.removeItemFromCartCatering;

export const { resetRemoveItemFromCartCatering } =
  removeItemFromCartCateringSlice.actions;

export default removeItemFromCartCateringSlice.reducer;
