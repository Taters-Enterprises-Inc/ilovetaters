import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { FacebookLoginPointParam } from "features/shared/core/shared.params";
import {
  FacebookLoginPointRepository,
  FacebookLoginPointResponse,
} from "features/shared/data/repository/shared.repository";

export enum FacebookLoginPointState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: FacebookLoginPointState;
  message: string;
}

const initialState: InitialState = {
  status: FacebookLoginPointState.initial,
  message: "",
};

export const facebookLoginPoint = createAsyncThunk(
  "facebookLoginPoint",
  async (param: FacebookLoginPointParam, { rejectWithValue }) => {
    try {
      const response: FacebookLoginPointResponse =
        await FacebookLoginPointRepository(param);
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
export const facebookLoginPointSlice = createSlice({
  name: "facebookLoginPoint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(facebookLoginPoint.pending, (state) => {
        state.status = FacebookLoginPointState.inProgress;
      })
      .addCase(facebookLoginPoint.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = FacebookLoginPointState.success;
          state.message = message;
        }
      })
      .addCase(facebookLoginPoint.rejected, (state, action) => {
        state.status = FacebookLoginPointState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectFacebookLoginPoint = (state: RootState) =>
  state.facebookLoginPoint;

export default facebookLoginPointSlice.reducer;
