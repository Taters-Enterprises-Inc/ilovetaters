import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateBscGroupRepository,
  CreateBscGroupResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum CreateBscGroupState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: CreateBscGroupState;
  message: string;
} = {
  status: CreateBscGroupState.initial,
  message: "",
};

export const createBscGroup = createAsyncThunk(
  "createBscGroup",
  async (fromData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: CreateBscGroupResponse = await CreateBscGroupRepository(
        fromData
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data);
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const createBscGroupSlice = createSlice({
  name: "createBscGroup",
  initialState,
  reducers: {
    resetCreateBscGroup: (state) => {
      state.status = CreateBscGroupState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(createBscGroup.pending, (state: any) => {
        state.status = CreateBscGroupState.inProgress;
      })
      .addCase(
        createBscGroup.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = CreateBscGroupState.success;
          state.message = message;
        }
      )
      .addCase(
        createBscGroup.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = CreateBscGroupState.fail;
          state.message = message;
        }
      );
  },
});

export const selectCreateBscGroup = (state: RootState) => state.createBscGroup;

export const { resetCreateBscGroup } = createBscGroupSlice.actions;

export default createBscGroupSlice.reducer;
