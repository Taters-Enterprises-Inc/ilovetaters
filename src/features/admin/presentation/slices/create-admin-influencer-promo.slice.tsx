import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateAdminInfluencerPromoParam } from "features/admin/core/admin.params";
import {
  CreateAdminInfluencerPromoRepository,
  CreateAdminInfluencerPromoResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminInfluencerPromoState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminInfluencerPromoState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminInfluencerPromoState.initial,
  message: "",
};

export const createAdminInfluencerPromo = createAsyncThunk(
  "createAdminInfluencerPromo",
  async (param: CreateAdminInfluencerPromoParam, { rejectWithValue }) => {
    try {
      const response: CreateAdminInfluencerPromoResponse =
        await CreateAdminInfluencerPromoRepository(param);

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

export const createAdminInfluencerPromoSlice = createSlice({
  name: "createAdminInfluencerPromo",
  initialState,
  reducers: {
    resetCreateAdminInfluencerPromoState: (state) => {
      state.status = CreateAdminInfluencerPromoState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminInfluencerPromo.pending, (state) => {
        state.status = CreateAdminInfluencerPromoState.inProgress;
      })
      .addCase(createAdminInfluencerPromo.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminInfluencerPromoState.success;
          state.message = message;
        }
      })
      .addCase(createAdminInfluencerPromo.rejected, (state, action) => {
        state.status = CreateAdminInfluencerPromoState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminInfluencerPromo = (state: RootState) =>
  state.createAdminInfluencerPromo;

export const { resetCreateAdminInfluencerPromoState } =
  createAdminInfluencerPromoSlice.actions;

export default createAdminInfluencerPromoSlice.reducer;
