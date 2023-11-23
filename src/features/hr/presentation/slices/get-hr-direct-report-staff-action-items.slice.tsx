import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrDirectReportStaffActionItemsRepository,
  GetHrDirectReportStaffActionItemsResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";
import { HrDirectReportStaffActionItemsModel } from "features/hr/core/domain/hr-direct-report-staff-action-items.model";

export enum GetHrDirectReportStaffActionItemsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrDirectReportStaffActionItemsState;
  message: string;
  data: HrDirectReportStaffActionItemsModel | undefined;
}

let initialState: InitialState = {
  status: GetHrDirectReportStaffActionItemsState.initial,
  message: "",
  data: undefined,
};

export const getHrDirectReportStaffActionItems = createAsyncThunk(
  "getHrDirectReportStaffActionItems",
  async (id: number, { rejectWithValue }) => {
    try {
      const response: GetHrDirectReportStaffActionItemsResponse =
        await GetHrDirectReportStaffActionItemsRepository(id);
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
export const getHrDirectReportStaffActionItemsSlice = createSlice({
  name: "getHrDirectReportStaffActionItems",
  initialState,
  reducers: {
    updateGetHrDirectReportStaffActionItemsState: (
      state,
      action: PayloadAction<{
        data: HrDirectReportStaffActionItemsModel | undefined;
      }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrDirectReportStaffActionItems.pending, (state) => {
        state.status = GetHrDirectReportStaffActionItemsState.inProgress;
      })
      .addCase(getHrDirectReportStaffActionItems.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrDirectReportStaffActionItemsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrDirectReportStaffActionItems.rejected, (state, action) => {
        state.status = GetHrDirectReportStaffActionItemsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrDirectReportStaffActionItems = (state: RootState) =>
  state.getHrDirectReportStaffActionItems;

export const { updateGetHrDirectReportStaffActionItemsState } =
  getHrDirectReportStaffActionItemsSlice.actions;

export default getHrDirectReportStaffActionItemsSlice.reducer;
