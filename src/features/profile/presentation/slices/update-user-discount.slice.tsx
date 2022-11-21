import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { UpdateUserDiscountParam } from "features/profile/core/profile.params";
import {
  UpdateUserDiscountRepository,
  UpdateUserDiscountResponse,
} from "features/profile/data/repository/profile.repository";

export enum UpdateUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateUserDiscountState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateUserDiscountState.initial,
  message: "",
};

export const updateUserDiscount = createAsyncThunk(
  "updateUserDiscount",
  async (param: UpdateUserDiscountParam, { rejectWithValue }) => {
    try {
      const response: UpdateUserDiscountResponse =
        await UpdateUserDiscountRepository(param);
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
export const updateUserDiscountSlice = createSlice({
  name: "updateUserDiscount",
  initialState,
  reducers: {
    resetUpdateUserDiscountStatus: (state) => {
      state.status = UpdateUserDiscountState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDiscount.pending, (state) => {
        state.status = UpdateUserDiscountState.inProgress;
      })
      .addCase(updateUserDiscount.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateUserDiscountState.success;
          state.message = message;
        }
      })
      .addCase(updateUserDiscount.rejected, (state, action) => {
        state.status = UpdateUserDiscountState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateUserDiscount = (state: RootState) =>
  state.updateUserDiscount;

export default updateUserDiscountSlice.reducer;
