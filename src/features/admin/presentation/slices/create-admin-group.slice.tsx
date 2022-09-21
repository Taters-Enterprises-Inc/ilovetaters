import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: CreateAdminGroupState;
  message: string;
} = {
  status: CreateAdminGroupState.initial,
  message: "",
};

export const createAdminGroup = createAsyncThunk(
  "createAdminGroup",
  async (fromData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: CreateAdminGroupResponse =
        await CreateAdminGroupRepository(fromData);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data);
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(createAdminGroup.pending, (state: any) => {
        state.status = CreateAdminGroupState.inProgress;
      })
      .addCase(
        createAdminGroup.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = CreateAdminGroupState.success;
          state.message = message;
        }
      )
      .addCase(
        createAdminGroup.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = CreateAdminGroupState.fail;
          state.message = message;
        }
      );
  },
});

export const selectCreateAdminGroup = (state: RootState) =>
  state.createAdminGroup;

export const { resetCreateAdminGroup } = createAdminGroupSlice.actions;

export default createAdminGroupSlice.reducer;
