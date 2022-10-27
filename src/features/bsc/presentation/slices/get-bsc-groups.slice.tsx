import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupModel } from "features/bsc/core/domain/bsc-group.model";
import { UserModel } from "features/bsc/core/domain/bsc-user.model";
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

const initialState: {
  status: GetBscGroupsState;
  message: string;
  data: Array<GroupModel> | undefined;
} = {
  status: GetBscGroupsState.initial,
  message: "",
  data: undefined,
};

export const getBscGroups = createAsyncThunk(
  "getBscGroups",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetBscGroupsResponse = await GetBscGroupsRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getBscGroupsSlice = createSlice({
  name: "getBscGroups",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getBscGroups.pending, (state: any) => {
        state.status = GetBscGroupsState.inProgress;
      })
      .addCase(
        getBscGroups.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetBscGroupsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getBscGroups.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetBscGroupsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetBscGroups = (state: RootState) => state.getBscGroups;

export default getBscGroupsSlice.reducer;
