import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UpdateIndicatorCateringParam } from "features/profile/core/shared.params";
import {
  UpdateIndicatorCateringResponse,
  UpdateIndicatorCateringRepository,
} from "features/profile/data/repository/profile.repository";

export enum UpdateIndicatorCateringState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateIndicatorCateringState;
  message: string;
} = {
  status: UpdateIndicatorCateringState.initial,
  message: "",
};

export const updateIndicatorCatering = createAsyncThunk(
  "updateIndicatorCatering",
  async (param: UpdateIndicatorCateringParam) => {
    const response: UpdateIndicatorCateringResponse =
      await UpdateIndicatorCateringRepository(param);
  }
);

/* Main Slice */
export const updateIndicatorCateringSlice = createSlice({
  name: "updateIndicatorCatering",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(updateIndicatorCatering.pending, (state: any) => {
        state.status = UpdateIndicatorCateringState.inProgress;
      })
      .addCase(
        updateIndicatorCatering.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = UpdateIndicatorCateringState.success;
        }
      )
      .addCase(
        updateIndicatorCatering.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = UpdateIndicatorCateringState.fail;
        }
      );
  },
});

export const selectUpdateIndicatorCatering = (state: RootState) =>
  state.updateIndicatorCatering;

export default updateIndicatorCateringSlice.reducer;
