import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetCateringProductDetailsParam } from "features/catering/core/catering.params";
import { CateringProductDetailsModel } from "features/catering/core/domain/catering-product-details.model";
import {
  GetCateringProductDetailsRepository,
  GetCateringProductDetailsResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum GetCateringProductDetailsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCateringProductDetailsState;
  data: CateringProductDetailsModel | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetCateringProductDetailsState.initial,
  data: undefined,
  message: "",
};

export const getCateringProductDetails = createAsyncThunk(
  "getCateringProductDetails",
  async (param: GetCateringProductDetailsParam, { rejectWithValue }) => {
    try {
      const response: GetCateringProductDetailsResponse =
        await GetCateringProductDetailsRepository(param);

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
export const getCateringProductDetailsSlice = createSlice({
  name: "getCateringProductDetails",
  initialState,
  reducers: {
    changeCateringProductPrice: (
      state,
      action: PayloadAction<{ price: number }>
    ) => {
      const { price } = action.payload;

      if (state.data) {
        state.data.product.price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCateringProductDetails.pending, (state) => {
        state.status = GetCateringProductDetailsState.inProgress;
      })
      .addCase(getCateringProductDetails.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetCateringProductDetailsState.success;

          state.data = data;
          state.message = message;
        }
      })
      .addCase(getCateringProductDetails.rejected, (state, action) => {
        state.status = GetCateringProductDetailsState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectGetCateringProductDetails = (state: RootState) =>
  state.getCateringProductDetails;

export const { changeCateringProductPrice } =
  getCateringProductDetailsSlice.actions;

export default getCateringProductDetailsSlice.reducer;
