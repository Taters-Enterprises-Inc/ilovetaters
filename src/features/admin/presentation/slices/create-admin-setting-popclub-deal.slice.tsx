import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateAdminSettingPopclubDealParam } from "features/admin/core/admin.params";
import {
  CreateAdminSettingPopclubDealRepository,
  CreateAdminSettingPopclubDealResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminSettingPopclubDealState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminSettingPopclubDealState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminSettingPopclubDealState.initial,
  message: "",
};

export const createAdminSettingPopclubDeal = createAsyncThunk(
  "createAdminSettingPopclubDeal",
  async (param: CreateAdminSettingPopclubDealParam, { rejectWithValue }) => {
    try {
      const response: CreateAdminSettingPopclubDealResponse =
        await CreateAdminSettingPopclubDealRepository(param);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        console.log(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const createAdminSettingPopclubDealSlice = createSlice({
  name: "createAdminSettingPopclubDeal",
  initialState,
  reducers: {
    resetCreateAdminSettingPopclubDealState: (state) => {
      state.status = CreateAdminSettingPopclubDealState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminSettingPopclubDeal.pending, (state) => {
        state.status = CreateAdminSettingPopclubDealState.inProgress;
      })
      .addCase(createAdminSettingPopclubDeal.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminSettingPopclubDealState.success;
          state.message = message;
        }
      })
      .addCase(createAdminSettingPopclubDeal.rejected, (state, action) => {
        state.status = CreateAdminSettingPopclubDealState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminSettingPopclubDeal = (state: RootState) =>
  state.createAdminSettingPopclubDeal;

export const { resetCreateAdminSettingPopclubDealState } =
  createAdminSettingPopclubDealSlice.actions;

export default createAdminSettingPopclubDealSlice.reducer;
