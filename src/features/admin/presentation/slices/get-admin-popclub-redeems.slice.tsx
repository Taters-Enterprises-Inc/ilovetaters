import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetAdminPopclubRedeemsState;
  message: string;
  data: GetAdminPopclubRedeemsModel | undefined;
} = {
  status: GetAdminPopclubRedeemsState.initial,
  message: "",
  data: undefined,
};

export const getAdminPopclubRedeems = createAsyncThunk(
  "getAdminPopclubRedeems",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminPopclubRedeemsResponse =
        await GetAdminPopclubRedeemsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminPopclubRedeems.pending, (state: any) => {
        state.status = GetAdminPopclubRedeemsState.inProgress;
      })
      .addCase(
        getAdminPopclubRedeems.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminPopclubRedeemsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminPopclubRedeemsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminPopclubRedeems.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminPopclubRedeemsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminPopclubRedeems = (state: RootState) =>
  state.getAdminPopclubRedeems;

export const { resetGetAdminPopclubRedeemsStatus } =
  getAdminPopclubRedeemsSlice.actions;

export default getAdminPopclubRedeemsSlice.reducer;
