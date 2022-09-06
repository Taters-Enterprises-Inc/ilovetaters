import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCartCateringParam } from "features/catering/core/catering.params";
import {
  AddToCartCateringRepository,
  AddToCartCateringResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum AddToCartCateringState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AddToCartCateringState;
  message: string;
} = {
  status: AddToCartCateringState.initial,
  message: "",
};

export const addToCartCatering = createAsyncThunk(
  "addToCartCatering",
  async (param: AddToCartCateringParam) => {
    const response: AddToCartCateringResponse =
      await AddToCartCateringRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const addToCartCateringSlice = createSlice({
  name: "addToCartCatering",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addToCartCatering.pending, (state: any) => {
        state.status = AddToCartCateringState.inProgress;
      })
      .addCase(
        addToCartCatering.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;
          state.status = AddToCartCateringState.success;

          state.message = message;
        }
      )
      .addCase(
        addToCartCatering.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = AddToCartCateringState.success;
        }
      );
  },
});

export const selectAddToCartCatering = (state: RootState) =>
  state.addToCartCatering;

export default addToCartCateringSlice.reducer;
