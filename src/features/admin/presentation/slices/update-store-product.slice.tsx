import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateStoreProductParam } from "features/admin/core/admin.params";
import {
  UpdateStoreProductRepository,
  UpdateStoreProductResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStoreProductState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateStoreProductState;
  message: string;
} = {
  status: UpdateStoreProductState.initial,
  message: "",
};

export const updateStoreProduct = createAsyncThunk(
  "updateStoreProduct",
  async (
    param: UpdateStoreProductParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateStoreProductResponse =
        await UpdateStoreProductRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateStoreProductSlice = createSlice({
  name: "updateStoreProduct",
  initialState,
  reducers: {
    resetUpdateStoreProduct: (state) => {
      state.status = UpdateStoreProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateStoreProduct.pending, (state: any) => {
        state.status = UpdateStoreProductState.inProgress;
      })
      .addCase(
        updateStoreProduct.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateStoreProductState.success;
          state.message = message;
        }
      )
      .addCase(
        updateStoreProduct.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateStoreProductState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateStoreProduct = (state: RootState) =>
  state.updateStoreProduct;

export const { resetUpdateStoreProduct } = updateStoreProductSlice.actions;

export default updateStoreProductSlice.reducer;
