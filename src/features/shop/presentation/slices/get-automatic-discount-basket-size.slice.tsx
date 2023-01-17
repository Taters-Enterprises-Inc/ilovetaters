import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { AutomaticDiscountBasketSizeModel } from "features/shared/core/domain/automatic-discount-basket-size.model";
import {
  GetAutomaticDiscountBasketSizesResponse,
  GetAutomaticDiscountBasketSizesRepository,
} from "features/shop/data/repository/shop.repository";

export enum GetAutomaticDiscountBasketSizesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAutomaticDiscountBasketSizesState;
  message: string;
  data: Array<AutomaticDiscountBasketSizeModel> | undefined;
}

const initialState: InitialState = {
  status: GetAutomaticDiscountBasketSizesState.initial,
  message: "",
  data: undefined,
};

export const getAutomaticDiscountBasketSizes = createAsyncThunk(
  "getAutomaticDiscountBasketSizes",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAutomaticDiscountBasketSizesResponse =
        await GetAutomaticDiscountBasketSizesRepository();
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
export const getAutomaticDiscountBasketSizesSlice = createSlice({
  name: "getAutomaticDiscountBasketSizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAutomaticDiscountBasketSizes.pending, (state) => {
        state.status = GetAutomaticDiscountBasketSizesState.inProgress;
      })
      .addCase(getAutomaticDiscountBasketSizes.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetAutomaticDiscountBasketSizesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAutomaticDiscountBasketSizes.rejected, (state, action) => {
        state.status = GetAutomaticDiscountBasketSizesState.fail;

        state.message = action.payload as string;
      });
  },
});

export const selectGetAutomaticDiscountBasketSizes = (state: RootState) =>
  state.getAutomaticDiscountBasketSizes;

export default getAutomaticDiscountBasketSizesSlice.reducer;
