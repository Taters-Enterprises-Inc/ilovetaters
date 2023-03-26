import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingInfluencerPromosModel } from "features/admin/core/domain/get-admin-setting-influencer-promos.model";
import {
  GetAdminSettingInfluencerPromosRepository,
  GetAdminSettingInfluencerPromosResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingInfluencerPromosState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSettingInfluencerPromosState;
  message: string;
  data: GetAdminSettingInfluencerPromosModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingInfluencerPromosState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingInfluencerPromos = createAsyncThunk(
  "getAdminSettingInfluencerPromos",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingInfluencerPromosResponse =
        await GetAdminSettingInfluencerPromosRepository(query);
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
export const getAdminSettingInfluencerPromosSlice = createSlice({
  name: "getAdminSettingInfluencerPromos",
  initialState,
  reducers: {
    resetGetAdminSettingInfluencerPromosState: (state) => {
      state.status = GetAdminSettingInfluencerPromosState.inProgress;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingInfluencerPromos.pending, (state) => {
        state.status = GetAdminSettingInfluencerPromosState.inProgress;
      })
      .addCase(getAdminSettingInfluencerPromos.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingInfluencerPromosState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingInfluencerPromos.rejected, (state, action) => {
        state.status = GetAdminSettingInfluencerPromosState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingInfluencerPromos = (state: RootState) =>
  state.getAdminSettingInfluencerPromos;

export const { resetGetAdminSettingInfluencerPromosState } =
  getAdminSettingInfluencerPromosSlice.actions;

export default getAdminSettingInfluencerPromosSlice.reducer;
