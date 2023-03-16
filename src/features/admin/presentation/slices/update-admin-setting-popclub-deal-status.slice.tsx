import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateAdminSettingPopclubDealStatusParam } from "features/admin/core/admin.params";
import {
  UpdateAdminSettingPopclubDealStatusRepository,
  UpdateAdminSettingPopclubDealStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminSettingPopclubDealStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateAdminSettingPopclubDealStatusState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminSettingPopclubDealStatusState.initial,
  message: "",
};

export const updateAdminSettingPopclubDealStatus = createAsyncThunk(
  "updateAdminSettingPopclubDealStatus",
  async (
    param: UpdateAdminSettingPopclubDealStatusParam,
    { rejectWithValue }
  ) => {
    try {
      const response: UpdateAdminSettingPopclubDealStatusResponse =
        await UpdateAdminSettingPopclubDealStatusRepository(param);

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

export const updateAdminSettingPopclubDealStatusSlice = createSlice({
  name: "updateAdminSettingPopclubDealStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminSettingPopclubDealStatus.pending, (state) => {
        state.status = UpdateAdminSettingPopclubDealStatusState.inProgress;
      })
      .addCase(
        updateAdminSettingPopclubDealStatus.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = UpdateAdminSettingPopclubDealStatusState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        updateAdminSettingPopclubDealStatus.rejected,
        (state, action) => {
          state.status = UpdateAdminSettingPopclubDealStatusState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectUpdateAdminSettingPopclubDealStatus = (state: RootState) =>
  state.updateAdminSettingPopclubDealStatus;

export default updateAdminSettingPopclubDealStatusSlice.reducer;
