import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  FacebookLogoutRepository,
  FacebookLogoutResponse,
} from "features/shared/data/repository/shared.repository";

export enum FacebookLogoutState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: FacebookLogoutState;
  message: string;
}

const initialState: InitialState = {
  status: FacebookLogoutState.initial,
  message: "",
};

export const facebookLogout = createAsyncThunk(
  "facebookLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response: FacebookLogoutResponse = await FacebookLogoutRepository();
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
export const facebookLogoutSlice = createSlice({
  name: "facebookLogout",
  initialState,
  reducers: {
    resetFacebookLogout: (state) => {
      state.status = FacebookLogoutState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookLogout.pending, (state) => {
        state.status = FacebookLogoutState.inProgress;
      })
      .addCase(facebookLogout.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = FacebookLogoutState.success;
          state.message = message;
        }
      })
      .addCase(facebookLogout.rejected, (state, action) => {
        state.status = FacebookLogoutState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectFacebookLogout = (state: RootState) => state.facebookLogout;

export const { resetFacebookLogout } = facebookLogoutSlice.actions;
export default facebookLogoutSlice.reducer;
