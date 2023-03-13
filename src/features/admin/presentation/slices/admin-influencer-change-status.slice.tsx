import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminInfluencerChangeStatusParam } from "features/admin/core/admin.params";
import {
  AdminInfluencerChangeStatusRepository,
  AdminInfluencerChangeStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminInfluencerChangeStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminInfluencerChangeStatusState;
  message: string;
}

const initialState: InitialState = {
  status: AdminInfluencerChangeStatusState.initial,
  message: "",
};

export const adminInfluencerChangeStatus = createAsyncThunk(
  "adminInfluencerChangeStatus",
  async (param: AdminInfluencerChangeStatusParam, { rejectWithValue }) => {
    try {
      const response: AdminInfluencerChangeStatusResponse =
        await AdminInfluencerChangeStatusRepository(param);
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
export const adminInfluencerChangeStatusSlice = createSlice({
  name: "adminInfluencerChangeStatus",
  initialState,
  reducers: {
    resetAdminInfluencerChangeStatusSliceStatus: (state) => {
      state.status = AdminInfluencerChangeStatusState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminInfluencerChangeStatus.pending, (state) => {
        state.status = AdminInfluencerChangeStatusState.inProgress;
      })
      .addCase(adminInfluencerChangeStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = AdminInfluencerChangeStatusState.success;
          state.message = message;
        }
      })
      .addCase(adminInfluencerChangeStatus.rejected, (state, action) => {
        state.status = AdminInfluencerChangeStatusState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminInfluencerChangeStatus = (state: RootState) =>
  state.adminInfluencerChangeStatus;

export const { resetAdminInfluencerChangeStatusSliceStatus } =
  adminInfluencerChangeStatusSlice.actions;

export default adminInfluencerChangeStatusSlice.reducer;
