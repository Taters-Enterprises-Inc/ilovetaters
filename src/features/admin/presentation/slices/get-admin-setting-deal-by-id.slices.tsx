import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserModel } from "features/admin/core/domain/user.model";
import { GetAdminStoreDealByIdResponse ,GetAdminSettingDealsByIdRepository } from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreDealByIdState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreDealByIdState;
  message: string;
  data: any | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreDealByIdState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreDealById = createAsyncThunk(
  "getAdminStoreDealById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreDealByIdResponse = await GetAdminSettingDealsByIdRepository(
        userId
      );
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
export const getAdminStoreDealByIdSlice = createSlice({
  name: "getAdminStoreDealById",
  initialState,
  reducers: {
    resetAdminStoreDealById: (state) => {
      state.status = GetAdminStoreDealByIdState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreDealById.pending, (state) => {
        state.status = GetAdminStoreDealByIdState.inProgress;
      })
      .addCase(getAdminStoreDealById.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreDealByIdState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreDealById.rejected, (state, action) => {
        state.status = GetAdminStoreDealByIdState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreDealById = (state: RootState) => state.getAdminStoreDealById;

export const { resetAdminStoreDealById } = getAdminStoreDealByIdSlice.actions;
export default getAdminStoreDealByIdSlice.reducer;
