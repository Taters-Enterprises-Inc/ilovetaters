import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AddToCartProductParam } from "features/catering/core/catering.params";
import {
  AddToCartCateringProductRepository,
  AddToCartCateringProductResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum AddToCartCateringProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AddToCartCateringProductState;
  message: string;
}

const initialState: InitialState = {
  status: AddToCartCateringProductState.initial,
  message: "",
};

export const addToCartCateringProduct = createAsyncThunk(
  "addToCartCateringProduct",
  async (param: AddToCartProductParam, { rejectWithValue }) => {
    try {
      const response: AddToCartCateringProductResponse =
        await AddToCartCateringProductRepository(param);

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
export const addToCartCateringProductSlice = createSlice({
  name: "addToCartCateringProduct",
  initialState,
  reducers: {
    resetAddToCartCateringProductState: (state) => {
      state.status = AddToCartCateringProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartCateringProduct.pending, (state) => {
        state.status = AddToCartCateringProductState.inProgress;
      })
      .addCase(addToCartCateringProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = AddToCartCateringProductState.success;
          state.message = message;
        }
      })
      .addCase(addToCartCateringProduct.rejected, (state, action) => {
        state.status = AddToCartCateringProductState.success;
        state.message = action.payload as string;
      });
  },
});

export const selectAddToCartCateringProduct = (state: RootState) =>
  state.addToCartCateringProduct;

export const { resetAddToCartCateringProductState } =
  addToCartCateringProductSlice.actions;

export default addToCartCateringProductSlice.reducer;
