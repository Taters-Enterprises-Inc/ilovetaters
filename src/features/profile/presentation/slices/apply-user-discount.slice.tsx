import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ApplyUserDiscountParam } from "features/profile/core/profile.params";
import {
  ApplyUserDiscountRepository,
  ApplyUserDiscountResponse,
} from "features/profile/data/repository/profile.repository";

export enum ApplyUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ApplyUserDiscountState;
  message: string;
}

const initialState: InitialState = {
  status: ApplyUserDiscountState.initial,
  message: "",
};

export const applyUserDiscount = createAsyncThunk(
  "applyUserDiscount",
  async (param: ApplyUserDiscountParam, { rejectWithValue }) => {
    try {
      const response: ApplyUserDiscountResponse =
        await ApplyUserDiscountRepository(param);

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        console.log(error.response.data.message);
        throw rejectWithValue({ message: error.response.data.message });
      }
    }
  }
);

/* Main Slice */
export const applyUserDiscountSlice = createSlice({
  name: "applyUserDiscount",
  initialState,
  reducers: {
    resetApplyUserDiscountStatus: (state) => {
      state.status = ApplyUserDiscountState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyUserDiscount.pending, (state) => {
        state.status = ApplyUserDiscountState.inProgress;
      })
      .addCase(applyUserDiscount.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = ApplyUserDiscountState.success;
          state.message = message;
        }
      })
      .addCase(applyUserDiscount.rejected, (state, action) => {
        state.status = ApplyUserDiscountState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectApplyUserDiscount = (state: RootState) =>
  state.applyUserDiscount;

export default applyUserDiscountSlice.reducer;
