import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateActionItemParam } from "features/hr/core/hr.params";
import {
  UpdateActionItemRepository,
  UpdateActionItemResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum UpdateActionItemState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateActionItemState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateActionItemState.initial,
  message: "",
};

export const updateActionItem = createAsyncThunk(
  "UpdateActionItem",
  async (param: UpdateActionItemParam, { rejectWithValue }) => {
    try {
      const response: UpdateActionItemResponse =
        await UpdateActionItemRepository(param);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        if (!error.response) {
          throw error;
        }
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

/* Main Slice */
export const updateActionItemSlice = createSlice({
  name: "updateActionItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionItem.pending, (state) => {
        state.status = UpdateActionItemState.inProgress;
      })
      .addCase(updateActionItem.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = UpdateActionItemState.success;
          state.message = message;
        }
      })
      .addCase(updateActionItem.rejected, (state, action) => {
        state.status = UpdateActionItemState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateActionItem = (state: RootState) =>
  state.updateActionItem;

export default updateActionItemSlice.reducer;
