import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GroupModel } from "features/bsc/core/domain/bsc-group.model";
import {
  GetBscGroupsRepository,
  GetBscGroupsResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum GetBscGroupsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetBscGroupsState;
  message: string;
  data: Array<GroupModel> | undefined;
}

const initialState: InitialState = {
  status: GetBscGroupsState.initial,
  message: "",
  data: undefined,
};

export const getBscGroups = createAsyncThunk(
  "getBscGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetBscGroupsResponse = await GetBscGroupsRepository();
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
export const getBscGroupsSlice = createSlice({
  name: "getBscGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBscGroups.pending, (state) => {
        state.status = GetBscGroupsState.inProgress;
      })
      .addCase(getBscGroups.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetBscGroupsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getBscGroups.rejected, (state, action) => {
        state.status = GetBscGroupsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetBscGroups = (state: RootState) => state.getBscGroups;

export default getBscGroupsSlice.reducer;
