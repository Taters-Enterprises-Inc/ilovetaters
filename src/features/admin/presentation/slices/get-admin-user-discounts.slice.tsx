import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminUserDiscountsModel } from "features/admin/core/domain/get-admin-user-discounts.model";
import {
  GetAdminUserDiscountsRepository,
  GetAdminUserDiscountsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminUserDiscountsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminUserDiscountsState;
  message: string;
  data: GetAdminUserDiscountsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminUserDiscountsState.initial,
  message: "",
  data: undefined,
};

export const getAdminUserDiscounts = createAsyncThunk(
  "getAdminUserDiscounts",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminUserDiscountsResponse =
        await GetAdminUserDiscountsRepository(query);
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
export const getAdminUserDiscountsSlice = createSlice({
  name: "getAdminUserDiscounts",
  initialState,
  reducers: {
    resetGetAdminUserDiscountsStatus: (state) => {
      state.status = GetAdminUserDiscountsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserDiscounts.pending, (state) => {
        state.status = GetAdminUserDiscountsState.inProgress;
      })
      .addCase(getAdminUserDiscounts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminUserDiscountsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminUserDiscounts.rejected, (state, action) => {
        state.status = GetAdminUserDiscountsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminUserDiscounts = (state: RootState) =>
  state.getAdminUserDiscounts;

export const { resetGetAdminUserDiscountsStatus } =
  getAdminUserDiscountsSlice.actions;

export default getAdminUserDiscountsSlice.reducer;
