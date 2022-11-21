import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: AddToCartCateringState;
  message: string;
}

const initialState: InitialState = {
  status: AddToCartCateringState.initial,
  message: "",
};

export const addToCartCatering = createAsyncThunk(
  "addToCartCatering",
  async (param: AddToCartCateringParam, { rejectWithValue }) => {
    try {
      const response: AddToCartCateringResponse =
        await AddToCartCateringRepository(param);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

/* Main Slice */
export const addToCartCateringSlice = createSlice({
  name: "addToCartCatering",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartCatering.pending, (state) => {
        state.status = AddToCartCateringState.inProgress;
      })
      .addCase(addToCartCatering.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = AddToCartCateringState.success;

          state.message = message;
        }
      })
      .addCase(addToCartCatering.rejected, (state, action) => {
        state.status = AddToCartCateringState.success;
        state.message = action.payload as string;
      });
  },
});

export const selectAddToCartCatering = (state: RootState) =>
  state.addToCartCatering;

export default addToCartCateringSlice.reducer;
