import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EditAdminSettingPopclubDealParam } from "features/admin/core/admin.params";
import {
  EditAdminSettingPopclubDealRepository,
  EditAdminSettingPopclubDealResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum EditAdminSettingPopclubDealState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: EditAdminSettingPopclubDealState;
  message: string;
}

const initialState: InitialState = {
  status: EditAdminSettingPopclubDealState.initial,
  message: "",
};

export const editAdminSettingPopclubDeal = createAsyncThunk(
  "editAdminSettingPopclubDeal",
  async (param: EditAdminSettingPopclubDealParam, { rejectWithValue }) => {
    try {
      const response: EditAdminSettingPopclubDealResponse =
        await EditAdminSettingPopclubDealRepository(param);

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

export const editAdminSettingPopclubDealSlice = createSlice({
  name: "editAdminSettingPopclubDeal",
  initialState,
  reducers: {
    resetEditAdminSettingPopclubDealState: (state) => {
      state.status = EditAdminSettingPopclubDealState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAdminSettingPopclubDeal.pending, (state) => {
        state.status = EditAdminSettingPopclubDealState.inProgress;
      })
      .addCase(editAdminSettingPopclubDeal.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = EditAdminSettingPopclubDealState.success;
          state.message = message;
        }
      })
      .addCase(editAdminSettingPopclubDeal.rejected, (state, action) => {
        state.status = EditAdminSettingPopclubDealState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectEditAdminSettingPopclubDeal = (state: RootState) =>
  state.editAdminSettingPopclubDeal;

export const { resetEditAdminSettingPopclubDealState } =
  editAdminSettingPopclubDealSlice.actions;

export default editAdminSettingPopclubDealSlice.reducer;
