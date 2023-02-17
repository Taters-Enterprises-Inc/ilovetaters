import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  GetAllStoresRepository,
  GetAllStoresResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetAllStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAllStoresState;
  message: string;
  data:
    | Array<{
        store_id: number;
        name: string;
        menu_name: string;
      }>
    | undefined;
}

const initialState: InitialState = {
  status: GetAllStoresState.initial,
  message: "",
  data: undefined,
};

export const getAllStores = createAsyncThunk(
  "getAllStores",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetAllStoresResponse = await GetAllStoresRepository();
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
export const getAllStoresSlice = createSlice({
  name: "getAllStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStores.pending, (state) => {
        state.status = GetAllStoresState.inProgress;
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetAllStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAllStores.rejected, (state, action) => {
        state.status = GetAllStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAllStores = (state: RootState) => state.getAllStores;

export default getAllStoresSlice.reducer;
