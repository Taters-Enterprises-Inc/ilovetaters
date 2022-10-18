import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DiscountRegistrationParam } from "features/shared/core/shared.params";
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

const initialState: {
  status: DiscountRegistrationState;
  message: string;
} = {
  status: DiscountRegistrationState.initial,
  message: "",
};

export const discountRegistration = createAsyncThunk(
  "discountRegistration",
  async (param: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: DiscountRegistrationResponse =
        await DiscountRegistrationRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const discountRegistrationSlice = createSlice({
  name: "discountRegistration",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(discountRegistration.pending, (state: any) => {
        state.status = DiscountRegistrationState.inProgress;
      })
      .addCase(
        discountRegistration.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = DiscountRegistrationState.success;
          state.message = message;
        }
      )
      .addCase(
        discountRegistration.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = DiscountRegistrationState.fail;
          state.message = message;
        }
      );
  },
});

export const selectdiscountRegistration = (state: RootState) =>
  state.discountRegistration;

export default discountRegistrationSlice.reducer;
