import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCartCateringParam } from "features/catering/core/catering.params";
import {
  AddToCartCateringRepository,
  AddToCartCateringResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum AddToCartCatering {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AddToCartCatering;
  message: string;
} = {
  status: AddToCartCatering.initial,
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
        state.status = AddToCartCatering.inProgress;
      })
      .addCase(
        addToCartCatering.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;
          state.status = AddToCartCatering.success;

          state.message = message;
        }
      )
      .addCase(
        addToCartCatering.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = AddToCartCatering.success;
        }
      );
  },
});

export const selectAddToCartCatering = (state: RootState) =>
  state.addToCartCatering;

export default addToCartCateringSlice.reducer;
