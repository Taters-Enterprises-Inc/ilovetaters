import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { DealProductVariantsModel } from "features/popclub/core/domain/deal_product_variants.model";
import { GetDealProductVariantsParam } from "features/popclub/core/popclub.params";
import {
  GetDealProductVariantsRepository,
  GetDealProductVariantsResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetDealProductVariantsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetDealProductVariantsState;
  message: string;
  data: Array<DealProductVariantsModel> | undefined;
}

const initialState: InitialState = {
  status: GetDealProductVariantsState.initial,
  message: "",
  data: undefined,
};

export const getDealProductVariants = createAsyncThunk(
  "getDealProductVariants",
  async (param: GetDealProductVariantsParam, { rejectWithValue }) => {
    try {
      const response: GetDealProductVariantsResponse =
        await GetDealProductVariantsRepository(param);
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
export const getDealProductVariantsSlice = createSlice({
  name: "getDealProductVariants",
  initialState,
  reducers: {
    resetGetDealProductVariantsState: (state) => {
      state.status = GetDealProductVariantsState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDealProductVariants.pending, (state) => {
        state.status = GetDealProductVariantsState.inProgress;
      })
      .addCase(getDealProductVariants.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetDealProductVariantsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getDealProductVariants.rejected, (state, action) => {
        state.status = GetDealProductVariantsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetDealProductVariants = (state: RootState) =>
  state.getDealProductVariants;

export const { resetGetDealProductVariantsState } =
  getDealProductVariantsSlice.actions;

export default getDealProductVariantsSlice.reducer;
