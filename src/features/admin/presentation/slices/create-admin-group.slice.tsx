import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  CreateAdminGroupRepository,
  CreateAdminGroupResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminGroupState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminGroupState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminGroupState.initial,
  message: "",
};

export const createAdminGroup = createAsyncThunk(
  "createAdminGroup",
  async (fromData: FormData, { rejectWithValue }) => {
    try {
      const response: CreateAdminGroupResponse =
        await CreateAdminGroupRepository(fromData);
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
export const createAdminGroupSlice = createSlice({
  name: "createAdminGroup",
  initialState,
  reducers: {
    resetCreateAdminGroup: (state) => {
      state.status = CreateAdminGroupState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminGroup.pending, (state) => {
        state.status = CreateAdminGroupState.inProgress;
      })
      .addCase(createAdminGroup.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminGroupState.success;
          state.message = message;
        }
      })
      .addCase(createAdminGroup.rejected, (state, action) => {
        state.status = CreateAdminGroupState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminGroup = (state: RootState) =>
  state.createAdminGroup;

export const { resetCreateAdminGroup } = createAdminGroupSlice.actions;

export default createAdminGroupSlice.reducer;
