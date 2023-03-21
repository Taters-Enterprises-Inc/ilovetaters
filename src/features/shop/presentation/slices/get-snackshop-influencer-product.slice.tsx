import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetSnackshopInfluencerProductModel } from "features/shop/core/domain/get-snackshop-influencer-product.model";
import { GetSnackshopInfluencerProductParam } from "features/shop/core/shop.params";
import {
  GetSnackshopInfluencerProductRepository,
  GetSnackshopInfluencerProductResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetSnackshopInfluencerProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSnackshopInfluencerProductState;
  message: string;
  data: GetSnackshopInfluencerProductModel | undefined;
}

const initialState: InitialState = {
  status: GetSnackshopInfluencerProductState.initial,
  message: "",
  data: undefined,
};

export const getSnackshopInfluencerProduct = createAsyncThunk(
  "getSnackshopInfluencerProduct",
  async (param: GetSnackshopInfluencerProductParam, { rejectWithValue }) => {
    try {
      const response: GetSnackshopInfluencerProductResponse =
        await GetSnackshopInfluencerProductRepository(param);
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
export const getSnackshopInfluencerProductSlice = createSlice({
  name: "getSnackshopInfluencerProduct",
  initialState,
  reducers: {
    resetGetSnackshopInfluencerProductState: (state) => {
      state.status = GetSnackshopInfluencerProductState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSnackshopInfluencerProduct.pending, (state) => {
        state.status = GetSnackshopInfluencerProductState.inProgress;
      })
      .addCase(getSnackshopInfluencerProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetSnackshopInfluencerProductState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSnackshopInfluencerProduct.rejected, (state, action) => {
        state.status = GetSnackshopInfluencerProductState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSnackshopInfluencerProduct = (state: RootState) =>
  state.getSnackshopInfluencerProduct;

export const { resetGetSnackshopInfluencerProductState } =
  getSnackshopInfluencerProductSlice.actions;

export default getSnackshopInfluencerProductSlice.reducer;
