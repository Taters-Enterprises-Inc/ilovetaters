import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AddToCartProductsParam } from "features/catering/core/catering.params";
import {
  AddToCartCateringProductsRepository,
  AddToCartCateringProductsResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum AddToCartCateringProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AddToCartCateringProductsState;
  message: string;
}

const initialState: InitialState = {
  status: AddToCartCateringProductsState.initial,
  message: "",
};

export const addToCartCateringProducts = createAsyncThunk(
  "addToCartCateringProducts",
  async (param: AddToCartProductsParam, { rejectWithValue }) => {
    try {
      const response: AddToCartCateringProductsResponse =
        await AddToCartCateringProductsRepository(param);

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
export const addToCartCateringProductsSlice = createSlice({
  name: "addToCartCateringProducts",
  initialState,
  reducers: {
    resetAddToCartCateringProductsState: (state) => {
      state.status = AddToCartCateringProductsState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartCateringProducts.pending, (state) => {
        state.status = AddToCartCateringProductsState.inProgress;
      })
      .addCase(addToCartCateringProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = AddToCartCateringProductsState.success;
          state.message = message;
        }
      })
      .addCase(addToCartCateringProducts.rejected, (state, action) => {
        state.status = AddToCartCateringProductsState.success;
        state.message = action.payload as string;
      });
  },
});

export const selectAddToCartCateringProducts = (state: RootState) =>
  state.addToCartCateringProducts;

export const { resetAddToCartCateringProductsState } =
  addToCartCateringProductsSlice.actions;

export default addToCartCateringProductsSlice.reducer;
