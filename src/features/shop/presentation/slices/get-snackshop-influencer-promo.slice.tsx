import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetSnackshopInfluencerPromoModel } from "features/shop/core/domain/get-snackshop-influencer-promo.model";
import { GetSnackshopInfluencerPromoParam } from "features/shop/core/shop.params";
import {
  GetSnackshopInfluencerPromoRepository,
  GetSnackshopInfluencerPromoResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetSnackshopInfluencerPromoState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSnackshopInfluencerPromoState;
  message: string;
  data: GetSnackshopInfluencerPromoModel | undefined;
}

const initialState: InitialState = {
  status: GetSnackshopInfluencerPromoState.initial,
  message: "",
  data: undefined,
};

export const getSnackshopInfluencerPromo = createAsyncThunk(
  "getSnackshopInfluencerPromo",
  async (param: GetSnackshopInfluencerPromoParam, { rejectWithValue }) => {
    try {
      const response: GetSnackshopInfluencerPromoResponse =
        await GetSnackshopInfluencerPromoRepository(param);
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
export const getSnackshopInfluencerPromoSlice = createSlice({
  name: "getSnackshopInfluencerPromo",
  initialState,
  reducers: {
    resetGetSnackshopInfluencerPromoState: (state) => {
      state.status = GetSnackshopInfluencerPromoState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSnackshopInfluencerPromo.pending, (state) => {
        state.status = GetSnackshopInfluencerPromoState.inProgress;
      })
      .addCase(getSnackshopInfluencerPromo.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetSnackshopInfluencerPromoState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSnackshopInfluencerPromo.rejected, (state, action) => {
        state.status = GetSnackshopInfluencerPromoState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSnackshopInfluencerPromo = (state: RootState) =>
  state.getSnackshopInfluencerPromo;

export const { resetGetSnackshopInfluencerPromoState } =
  getSnackshopInfluencerPromoSlice.actions;

export default getSnackshopInfluencerPromoSlice.reducer;
