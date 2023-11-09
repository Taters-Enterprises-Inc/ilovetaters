import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrActionItemsRepository,
  GetHrActionItemsResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";
import { HrActionItemsModel } from "features/hr/core/domain/hr-action-items.model";

export enum GetHrActionItemsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrActionItemsState;
  message: string;
  data: HrActionItemsModel | undefined;
}

let initialState: InitialState = {
  status: GetHrActionItemsState.initial,
  message: "",
  data: undefined,
};

export const getHrActionItems = createAsyncThunk(
  "getHrActionItems",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetHrActionItemsResponse =
        await GetHrActionItemsRepository();
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
export const getHrActionItemsSlice = createSlice({
  name: "getHrActionItems",
  initialState,
  reducers: {
    updateGetHrActionItemsState: (
      state,
      action: PayloadAction<{
        data: HrActionItemsModel | undefined;
      }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrActionItems.pending, (state) => {
        state.status = GetHrActionItemsState.inProgress;
      })
      .addCase(getHrActionItems.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrActionItemsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrActionItems.rejected, (state, action) => {
        state.status = GetHrActionItemsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrActionItems = (state: RootState) =>
  state.getHrActionItems;

export const { updateGetHrActionItemsState } = getHrActionItemsSlice.actions;

export default getHrActionItemsSlice.reducer;
