import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateAdminSettingInfluencerPromoParam } from "features/admin/core/admin.params";
import {
  CreateAdminSettingInfluencerPromoRepository,
  CreateAdminSettingInfluencerPromoResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminSettingInfluencerPromoState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminSettingInfluencerPromoState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminSettingInfluencerPromoState.initial,
  message: "",
};

export const createAdminSettingInfluencerPromo = createAsyncThunk(
  "createAdminSettingInfluencerPromo",
  async (
    param: CreateAdminSettingInfluencerPromoParam,
    { rejectWithValue }
  ) => {
    try {
      const response: CreateAdminSettingInfluencerPromoResponse =
        await CreateAdminSettingInfluencerPromoRepository(param);

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

export const createAdminSettingInfluencerPromoSlice = createSlice({
  name: "createAdminSettingInfluencerPromo",
  initialState,
  reducers: {
    resetCreateAdminSettingInfluencerPromoState: (state) => {
      state.status = CreateAdminSettingInfluencerPromoState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminSettingInfluencerPromo.pending, (state) => {
        state.status = CreateAdminSettingInfluencerPromoState.inProgress;
      })
      .addCase(createAdminSettingInfluencerPromo.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminSettingInfluencerPromoState.success;
          state.message = message;
        }
      })
      .addCase(createAdminSettingInfluencerPromo.rejected, (state, action) => {
        state.status = CreateAdminSettingInfluencerPromoState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminSettingInfluencerPromo = (state: RootState) =>
  state.createAdminSettingInfluencerPromo;

export const { resetCreateAdminSettingInfluencerPromoState } =
  createAdminSettingInfluencerPromoSlice.actions;

export default createAdminSettingInfluencerPromoSlice.reducer;
