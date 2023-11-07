import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateKraParam } from "features/hr/core/hr.params";
import {
  UpdateKraRepository,
  UpdateKraResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";

export enum UpdateKraState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateKraState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateKraState.initial,
  message: "",
};

export const updateKra = createAsyncThunk(
  "UpdateKra",
  async (param: UpdateKraParam, { rejectWithValue }) => {
    try {
      const response: UpdateKraResponse = await UpdateKraRepository(param);
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
export const updateKraSlice = createSlice({
  name: "updateKra",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateKra.pending, (state) => {
        state.status = UpdateKraState.inProgress;
      })
      .addCase(updateKra.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = UpdateKraState.success;
          state.message = message;
        }
      })
      .addCase(updateKra.rejected, (state, action) => {
        state.status = UpdateKraState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateKra = (state: RootState) => state.updateKra;

export default updateKraSlice.reducer;
