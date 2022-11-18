import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateStoreDealParam } from "features/admin/core/admin.params";
import {
  UpdateStoreDealRepository,
  UpdateStoreDealResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStoreDealState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateStoreDealState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateStoreDealState.initial,
  message: "",
};

export const updateStoreDeal = createAsyncThunk(
  "updateStoreDeal",
  async (param: UpdateStoreDealParam, { rejectWithValue }) => {
    try {
      const response: UpdateStoreDealResponse = await UpdateStoreDealRepository(
        param
      );
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
export const updateStoreDealSlice = createSlice({
  name: "updateStoreDeal",
  initialState,
  reducers: {
    resetUpdateStoreDeal: (state) => {
      state.status = UpdateStoreDealState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStoreDeal.pending, (state) => {
        state.status = UpdateStoreDealState.inProgress;
      })
      .addCase(updateStoreDeal.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateStoreDealState.success;
          state.message = message;
        }
      })
      .addCase(updateStoreDeal.rejected, (state, action) => {
        state.status = UpdateStoreDealState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateStoreDeal = (state: RootState) =>
  state.updateStoreDeal;

export const { resetUpdateStoreDeal } = updateStoreDealSlice.actions;

export default updateStoreDealSlice.reducer;
