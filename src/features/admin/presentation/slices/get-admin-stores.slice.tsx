import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import {
  GetAdminStoresRepository,
  GetAdminStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoresState;
  message: string;
  data: Array<AdminStoreModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminStores = createAsyncThunk(
  "getAdminStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminStoresResponse = await GetAdminStoresRepository();
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
export const getAdminStoresSlice = createSlice({
  name: "getAdminStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStores.pending, (state) => {
        state.status = GetAdminStoresState.inProgress;
      })
      .addCase(getAdminStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStores.rejected, (state, action) => {
        state.status = GetAdminStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStores = (state: RootState) => state.getAdminStores;

// export const selectGetAdminStoreByProductID = (state: RootState, id: number) => {
//   if(state.getAdminStores.data){
//     return state.getAdminStores.data.filter((store) => store.product_id.toString() === id.toString())
//   }
// }
export default getAdminStoresSlice.reducer;
