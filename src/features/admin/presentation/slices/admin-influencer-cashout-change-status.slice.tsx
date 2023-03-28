import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminInfluencerCashoutChangeStatusParam } from "features/admin/core/admin.params";
import {
  AdminInfluencerCashoutChangeStatusRepository,
  AdminInfluencerCashoutChangeStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminInfluencerCashoutChangeStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminInfluencerCashoutChangeStatusState;
  message: string;
}

const initialState: InitialState = {
  status: AdminInfluencerCashoutChangeStatusState.initial,
  message: "",
};

export const adminInfluencerCashoutChangeStatus = createAsyncThunk(
  "adminInfluencerCashoutChangeStatus",
  async (
    param: AdminInfluencerCashoutChangeStatusParam,
    { rejectWithValue }
  ) => {
    try {
      const response: AdminInfluencerCashoutChangeStatusResponse =
        await AdminInfluencerCashoutChangeStatusRepository(param);
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
export const adminInfluencerCashoutChangeStatusSlice = createSlice({
  name: "adminInfluencerCashoutChangeStatus",
  initialState,
  reducers: {
    resetAdminInfluencerCashoutChangeStatusSliceStatus: (state) => {
      state.status = AdminInfluencerCashoutChangeStatusState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminInfluencerCashoutChangeStatus.pending, (state) => {
        state.status = AdminInfluencerCashoutChangeStatusState.inProgress;
      })
      .addCase(
        adminInfluencerCashoutChangeStatus.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = AdminInfluencerCashoutChangeStatusState.success;
            state.message = message;
          }
        }
      )
      .addCase(adminInfluencerCashoutChangeStatus.rejected, (state, action) => {
        state.status = AdminInfluencerCashoutChangeStatusState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminInfluencerCashoutChangeStatus = (state: RootState) =>
  state.adminInfluencerCashoutChangeStatus;

export const { resetAdminInfluencerCashoutChangeStatusSliceStatus } =
  adminInfluencerCashoutChangeStatusSlice.actions;

export default adminInfluencerCashoutChangeStatusSlice.reducer;
