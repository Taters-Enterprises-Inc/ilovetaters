import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: CreateBscGroupState;
  message: string;
}

const initialState: InitialState = {
  status: CreateBscGroupState.initial,
  message: "",
};

export const createBscGroup = createAsyncThunk(
  "createBscGroup",
  async (fromData: FormData, { rejectWithValue }) => {
    try {
      const response: CreateBscGroupResponse = await CreateBscGroupRepository(
        fromData
      );
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
export const createBscGroupSlice = createSlice({
  name: "createBscGroup",
  initialState,
  reducers: {
    resetCreateBscGroup: (state) => {
      state.status = CreateBscGroupState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBscGroup.pending, (state) => {
        state.status = CreateBscGroupState.inProgress;
      })
      .addCase(createBscGroup.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateBscGroupState.success;
          state.message = message;
        }
      })
      .addCase(createBscGroup.rejected, (state, action) => {
        state.status = CreateBscGroupState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateBscGroup = (state: RootState) => state.createBscGroup;

export const { resetCreateBscGroup } = createBscGroupSlice.actions;

export default createBscGroupSlice.reducer;
