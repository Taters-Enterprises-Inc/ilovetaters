import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  DiscountRegistrationRepository,
  DiscountRegistrationResponse,
} from "features/shared/data/repository/shared.repository";

export enum DiscountRegistrationState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: DiscountRegistrationState;
  message: string;
}

const initialState: InitialState = {
  status: DiscountRegistrationState.initial,
  message: "",
};

export const discountRegistration = createAsyncThunk(
  "discountRegistration",
  async (param: FormData, { rejectWithValue }) => {
    try {
      const response: DiscountRegistrationResponse =
        await DiscountRegistrationRepository(param);
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
export const discountRegistrationSlice = createSlice({
  name: "discountRegistration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(discountRegistration.pending, (state) => {
        state.status = DiscountRegistrationState.inProgress;
      })
      .addCase(discountRegistration.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = DiscountRegistrationState.success;
          state.message = message;
        }
      })
      .addCase(discountRegistration.rejected, (state, action) => {
        state.status = DiscountRegistrationState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectdiscountRegistration = (state: RootState) =>
  state.discountRegistration;

export default discountRegistrationSlice.reducer;
