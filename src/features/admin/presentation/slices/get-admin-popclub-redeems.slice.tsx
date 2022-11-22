import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminPopclubRedeemsModel } from "features/admin/core/domain/get-admin-popclub-redeems.model";
import {
  GetAdminPopclubRedeemsRepository,
  GetAdminPopclubRedeemsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminPopclubRedeemsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminPopclubRedeemsState;
  message: string;
  data: GetAdminPopclubRedeemsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminPopclubRedeemsState.initial,
  message: "",
  data: undefined,
};

export const getAdminPopclubRedeems = createAsyncThunk(
  "getAdminPopclubRedeems",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminPopclubRedeemsResponse =
        await GetAdminPopclubRedeemsRepository(query);
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
export const getAdminPopclubRedeemsSlice = createSlice({
  name: "getAdminPopclubRedeems",
  initialState,
  reducers: {
    resetGetAdminPopclubRedeemsStatus: (state) => {
      state.status = GetAdminPopclubRedeemsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPopclubRedeems.pending, (state) => {
        state.status = GetAdminPopclubRedeemsState.inProgress;
      })
      .addCase(getAdminPopclubRedeems.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminPopclubRedeemsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminPopclubRedeems.rejected, (state, action) => {
        state.status = GetAdminPopclubRedeemsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminPopclubRedeems = (state: RootState) =>
  state.getAdminPopclubRedeems;

export const { resetGetAdminPopclubRedeemsStatus } =
  getAdminPopclubRedeemsSlice.actions;

export default getAdminPopclubRedeemsSlice.reducer;
