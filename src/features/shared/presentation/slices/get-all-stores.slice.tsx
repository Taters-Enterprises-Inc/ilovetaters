import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UserDiscountModel } from "features/shared/core/domain/user-discount.model";
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

const initialState: {
  status: GetAllStoresState;
  data:
    | Array<{
        store_id: number;
        name: string;
        menu_name: string;
      }>
    | undefined;
} = {
  status: GetAllStoresState.initial,
  data: undefined,
};

export const getAllStores = createAsyncThunk(
  "getAllStores",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAllStoresResponse = await GetAllStoresRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAllStoresSlice = createSlice({
  name: "getAllStores",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllStores.pending, (state: any) => {
        state.status = GetAllStoresState.inProgress;
      })
      .addCase(
        getAllStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserDiscountModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAllStoresState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAllStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAllStoresState.fail;
          state.message = message;
        }
      );
  },
});

export const selectGetAllStores = (state: RootState) => state.getAllStores;

export default getAllStoresSlice.reducer;
