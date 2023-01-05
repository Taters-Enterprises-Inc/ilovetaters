import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateAdminCateringOrderItemRemarksParam } from "features/admin/core/admin.params";
import {
  UpdateAdminCateringOrderItemRemarksRepository,
  UpdateAdminCateringOrderItemRemarksResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminCateringOrderItemRemarksState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateAdminCateringOrderItemRemarksState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminCateringOrderItemRemarksState.initial,
  message: "",
};

export const updateAdminCateringOrderItemRemarks = createAsyncThunk(
  "updateAdminCateringOrderItemRemarks",
  async (
    param: UpdateAdminCateringOrderItemRemarksParam,
    { rejectWithValue }
  ) => {
    try {
      const response: UpdateAdminCateringOrderItemRemarksResponse =
        await UpdateAdminCateringOrderItemRemarksRepository(param);
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
export const updateAdminCateringOrderItemRemarksSlice = createSlice({
  name: "updateAdminCateringOrderItemRemarks",
  initialState,
  reducers: {
    resetUpdateAdminCateringOrderItemRemarks: (state) => {
      state.status = UpdateAdminCateringOrderItemRemarksState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminCateringOrderItemRemarks.pending, (state) => {
        state.status = UpdateAdminCateringOrderItemRemarksState.inProgress;
      })
      .addCase(
        updateAdminCateringOrderItemRemarks.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = UpdateAdminCateringOrderItemRemarksState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        updateAdminCateringOrderItemRemarks.rejected,
        (state, action) => {
          state.status = UpdateAdminCateringOrderItemRemarksState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectUpdateAdminCateringOrderItemRemarks = (state: RootState) =>
  state.updateAdminCateringOrderItemRemarks;

export const { resetUpdateAdminCateringOrderItemRemarks } =
  updateAdminCateringOrderItemRemarksSlice.actions;

export default updateAdminCateringOrderItemRemarksSlice.reducer;
