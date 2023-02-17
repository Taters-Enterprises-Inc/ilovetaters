import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetCateringPackageDetailsParam } from "features/catering/core/catering.params";
import { CateringPackageDetailsModel } from "features/catering/core/domain/catering-package-details.model";
import {
  GetCateringPackageDetailsRepository,
  GetCateringPackageDetailsResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum GetCateringPackageDetailsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCateringPackageDetailsState;
  data: CateringPackageDetailsModel | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetCateringPackageDetailsState.initial,
  data: undefined,
  message: "",
};

export const getCateringPackageDetails = createAsyncThunk(
  "getCateringPackageDetails",
  async (param: GetCateringPackageDetailsParam, { rejectWithValue }) => {
    try {
      const response: GetCateringPackageDetailsResponse =
        await GetCateringPackageDetailsRepository(param);

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
export const getCateringPackageDetailsSlice = createSlice({
  name: "getCateringPackageDetails",
  initialState,
  reducers: {
    changeCateringPackagePrice: (
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
      .addCase(getCateringPackageDetails.pending, (state) => {
        state.status = GetCateringPackageDetailsState.inProgress;
      })
      .addCase(getCateringPackageDetails.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetCateringPackageDetailsState.success;

          state.data = data;
          state.message = message;
        }
      })
      .addCase(getCateringPackageDetails.rejected, (state, action) => {
        state.status = GetCateringPackageDetailsState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectGetCateringPackageDetails = (state: RootState) =>
  state.getCateringPackageDetails;

export const { changeCateringPackagePrice } =
  getCateringPackageDetailsSlice.actions;

export default getCateringPackageDetailsSlice.reducer;
