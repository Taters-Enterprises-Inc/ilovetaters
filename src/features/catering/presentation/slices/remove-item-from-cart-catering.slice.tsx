import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  RemoveItemFromCartCateringRepository,
  RemoveItemFromCartCateringResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum RemoveItemFromCartCateringState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: RemoveItemFromCartCateringState;
  message: string;
}

const initialState: InitialState = {
  status: RemoveItemFromCartCateringState.initial,
  message: "",
};

export const removeItemFromCartCatering = createAsyncThunk(
  "removeItemFromCartCatering",
  async (param: number, { rejectWithValue }) => {
    try {
      const response: RemoveItemFromCartCateringResponse =
        await RemoveItemFromCartCateringRepository(param);
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
export const removeItemFromCartCateringSlice = createSlice({
  name: "removeItemFromCartCatering",
  initialState,
  reducers: {
    resetRemoveItemFromCartCatering: (state) => {
      state.status = RemoveItemFromCartCateringState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeItemFromCartCatering.pending, (state) => {
        state.status = RemoveItemFromCartCateringState.inProgress;
      })
      .addCase(removeItemFromCartCatering.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = RemoveItemFromCartCateringState.success;
          state.message = message;
        }
      })
      .addCase(removeItemFromCartCatering.rejected, (state, action) => {
        state.status = RemoveItemFromCartCateringState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectRemoveItemFromCartCatering = (state: RootState) =>
  state.removeItemFromCartCatering;

export const { resetRemoveItemFromCartCatering } =
  removeItemFromCartCateringSlice.actions;

export default removeItemFromCartCateringSlice.reducer;
