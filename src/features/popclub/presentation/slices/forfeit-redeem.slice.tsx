import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  ForfeitRedeemRepository,
  ForfeitRedeemResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum ForfeitRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ForfeitRedeemState;
  message: string;
}

const initialState: InitialState = {
  status: ForfeitRedeemState.initial,
  message: "",
};

export const forfeitRedeem = createAsyncThunk(
  "forfeitRedeem",
  async (_, { rejectWithValue }) => {
    try {
      const response: ForfeitRedeemResponse = await ForfeitRedeemRepository();
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
export const forfeitRedeemSlice = createSlice({
  name: "forfeitRedeem",
  initialState,
  reducers: {
    resetForfeitRedeemStateStatus: (state) => {
      state.status = ForfeitRedeemState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forfeitRedeem.pending, (state) => {
        state.status = ForfeitRedeemState.inProgress;
      })
      .addCase(forfeitRedeem.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = ForfeitRedeemState.success;
          state.message = message;
        }
      })
      .addCase(forfeitRedeem.rejected, (state, action) => {
        state.status = ForfeitRedeemState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectForfeitRedeem = (state: RootState) => state.forfeitRedeem;

export const { resetForfeitRedeemStateStatus } = forfeitRedeemSlice.actions;

export default forfeitRedeemSlice.reducer;
