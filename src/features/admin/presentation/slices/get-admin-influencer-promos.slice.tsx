import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminInfluencerPromosModel } from "features/admin/core/domain/get-admin-influencer-promos.model";
import {
  GetAdminInfluencerPromosRepository,
  GetAdminInfluencerPromosResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminInfluencerPromosState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminInfluencerPromosState;
  message: string;
  data: GetAdminInfluencerPromosModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminInfluencerPromosState.initial,
  message: "",
  data: undefined,
};

export const getAdminInfluencerPromos = createAsyncThunk(
  "getAdminInfluencerPromos",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminInfluencerPromosResponse =
        await GetAdminInfluencerPromosRepository(query);
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
export const getAdminInfluencerPromosSlice = createSlice({
  name: "getAdminInfluencerPromos",
  initialState,
  reducers: {
    resetGetAdminInfluencerPromosState: (state) => {
      state.status = GetAdminInfluencerPromosState.inProgress;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfluencerPromos.pending, (state) => {
        state.status = GetAdminInfluencerPromosState.inProgress;
      })
      .addCase(getAdminInfluencerPromos.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminInfluencerPromosState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminInfluencerPromos.rejected, (state, action) => {
        state.status = GetAdminInfluencerPromosState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminInfluencerPromos = (state: RootState) =>
  state.getAdminInfluencerPromos;

export const { resetGetAdminInfluencerPromosState } =
  getAdminInfluencerPromosSlice.actions;

export default getAdminInfluencerPromosSlice.reducer;
