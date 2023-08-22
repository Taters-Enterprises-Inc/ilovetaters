import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminInfluencerApplicationChangeStatusParam } from "features/admin/core/admin.params";
import {
  AdminInfluencerApplicationChangeStatusRepository,
  AdminInfluencerApplicationChangeStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminInfluencerApplicationChangeStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminInfluencerApplicationChangeStatusState;
  message: string;
}

const initialState: InitialState = {
  status: AdminInfluencerApplicationChangeStatusState.initial,
  message: "",
};

export const adminInfluencerApplicationChangeStatus = createAsyncThunk(
  "adminInfluencerApplicationChangeStatus",
  async (
    param: AdminInfluencerApplicationChangeStatusParam,
    { rejectWithValue }
  ) => {
    try {
      const response: AdminInfluencerApplicationChangeStatusResponse =
        await AdminInfluencerApplicationChangeStatusRepository(param);
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
export const adminInfluencerApplicationChangeStatusSlice = createSlice({
  name: "adminInfluencerApplicationChangeStatus",
  initialState,
  reducers: {
    resetAdminInfluencerApplicationChangeStatusSliceStatus: (state) => {
      state.status = AdminInfluencerApplicationChangeStatusState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminInfluencerApplicationChangeStatus.pending, (state) => {
        state.status = AdminInfluencerApplicationChangeStatusState.inProgress;
      })
      .addCase(
        adminInfluencerApplicationChangeStatus.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = AdminInfluencerApplicationChangeStatusState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        adminInfluencerApplicationChangeStatus.rejected,
        (state, action) => {
          state.status = AdminInfluencerApplicationChangeStatusState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectAdminInfluencerApplicationChangeStatus = (
  state: RootState
) => state.adminInfluencerApplicationChangeStatus;

export const { resetAdminInfluencerApplicationChangeStatusSliceStatus } =
  adminInfluencerApplicationChangeStatusSlice.actions;

export default adminInfluencerApplicationChangeStatusSlice.reducer;
