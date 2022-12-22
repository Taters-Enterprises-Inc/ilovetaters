import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateStoreCateringProductParam } from "features/admin/core/admin.params";
import {
  UpdateStoreCateringProductRepository,
  UpdateStoreCateringProductResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStoreCateringProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateStoreCateringProductState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateStoreCateringProductState.initial,
  message: "",
};

export const updateStoreCateringProduct = createAsyncThunk(
  "updateStoreCateringProduct",
  async (param: UpdateStoreCateringProductParam, { rejectWithValue }) => {
    try {
      const response: UpdateStoreCateringProductResponse =
        await UpdateStoreCateringProductRepository(param);
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
export const updateStoreCateringProductSlice = createSlice({
  name: "updateStoreCateringProduct",
  initialState,
  reducers: {
    resetUpdateStoreCateringProduct: (state) => {
      state.status = UpdateStoreCateringProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStoreCateringProduct.pending, (state) => {
        state.status = UpdateStoreCateringProductState.inProgress;
      })
      .addCase(updateStoreCateringProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateStoreCateringProductState.success;
          state.message = message;
        }
      })
      .addCase(updateStoreCateringProduct.rejected, (state, action) => {
        state.status = UpdateStoreCateringProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateStoreCateringProduct = (state: RootState) =>
  state.updateStoreCateringProduct;

export const { resetUpdateStoreCateringProduct } =
  updateStoreCateringProductSlice.actions;

export default updateStoreCateringProductSlice.reducer;
