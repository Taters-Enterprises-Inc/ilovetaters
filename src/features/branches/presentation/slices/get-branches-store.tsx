import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { BranchesStoreModel } from "features/branches/core/domain/branches-store.model";
import {
  GetBranchesStoreRepository,
  GetBranchesStoreResponse,
} from "features/branches/data/repository/branches.repository";
import { RootState } from "features/config/store";

export enum GetBrachesStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetBrachesStoreState;
  message: string;
  data:
    | Array<{
        ncr: Array<BranchesStoreModel>;
        luzon: Array<BranchesStoreModel>;
        visayas: Array<BranchesStoreModel>;
        mindanao: Array<BranchesStoreModel>;
      }>
    | undefined;
}

const initialState: InitialState = {
  status: GetBrachesStoreState.initial,
  message: "",
  data: undefined,
};

export const getBranchesStore = createAsyncThunk(
  "getBranchesStore",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetBranchesStoreResponse =
        await GetBranchesStoreRepository();
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
export const getBranchesStoreSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranchesStore.pending, (state) => {
        state.status = GetBrachesStoreState.inProgress;
      })
      .addCase(getBranchesStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetBrachesStoreState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getBranchesStore.rejected, (state, action) => {
        state.status = GetBrachesStoreState.fail;
        state.message = action.payload as string;
      });
  },
});

//state if u want to get the value is inclue for args of useSelector
export const selectGetBranchesStore = (state: RootState) =>
  state.getBranchesStore;

// reducer
export default getBranchesStoreSlice.reducer;
