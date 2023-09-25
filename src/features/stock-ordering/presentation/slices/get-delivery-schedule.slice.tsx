import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { DeliveryScheduleModel } from "features/stock-ordering/core/domain/delivery-schedule.model";
import {
  GetDeliveryScheduleRepository,
  GetDeliveryScheduleResponse,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetDeliveryScheduleState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetDeliveryScheduleState;
  message: string;
  data: Array<DeliveryScheduleModel> | undefined;
}

const initialState: InitialState = {
  status: GetDeliveryScheduleState.initial,
  message: "",
  data: undefined,
};

export const getDeliverySchedule = createAsyncThunk(
  "getDeliverySchedule",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetDeliveryScheduleResponse =
        await GetDeliveryScheduleRepository();
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
export const getDeliveryScheduleSlice = createSlice({
  name: "getDeliverySchedule",
  initialState,
  reducers: {
    resetGetDeliverySchedule: (state) => {
      state.status = GetDeliveryScheduleState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeliverySchedule.pending, (state) => {
        state.status = GetDeliveryScheduleState.inProgress;
      })
      .addCase(getDeliverySchedule.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetDeliveryScheduleState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getDeliverySchedule.rejected, (state, action) => {
        state.status = GetDeliveryScheduleState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetDeliverySchedule = (state: RootState) =>
  state.getDeliverySchedule;

export const { resetGetDeliverySchedule } = getDeliveryScheduleSlice.actions;
export default getDeliveryScheduleSlice.reducer;
