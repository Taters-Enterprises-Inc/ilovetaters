import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const initialState: {
  status: FacebookLoginPointState;
} = {
  status: FacebookLoginPointState.initial,
};

export const facebookLoginPoint = createAsyncThunk(
  "facebookLoginPoint",
  async (param: FacebookLoginPointParam) => {
    const response: FacebookLoginPointResponse =
      await FacebookLoginPointRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const facebookLoginPointSlice = createSlice({
  name: "facebookLoginPoint",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(facebookLoginPoint.pending, (state: any) => {
        state.status = FacebookLoginPointState.inProgress;
      })
      .addCase(facebookLoginPoint.fulfilled, (state: any) => {
        state.status = FacebookLoginPointState.success;
      })
      .addCase(facebookLoginPoint.rejected, (state: any) => {
        state.status = FacebookLoginPointState.fail;
      });
  },
});

export const selectFacebookLoginPoint = (state: RootState) =>
  state.facebookLoginPoint;

export default facebookLoginPointSlice.reducer;
