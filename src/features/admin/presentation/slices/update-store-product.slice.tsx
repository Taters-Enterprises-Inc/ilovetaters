import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: UpdateStoreProductState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateStoreProductState.initial,
  message: "",
};

export const updateStoreProduct = createAsyncThunk(
  "updateStoreProduct",
  async (param: UpdateStoreProductParam, { rejectWithValue }) => {
    try {
      const response: UpdateStoreProductResponse =
        await UpdateStoreProductRepository(param);
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
export const updateStoreProductSlice = createSlice({
  name: "updateStoreProduct",
  initialState,
  reducers: {
    resetUpdateStoreProduct: (state) => {
      state.status = UpdateStoreProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStoreProduct.pending, (state) => {
        state.status = UpdateStoreProductState.inProgress;
      })
      .addCase(updateStoreProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateStoreProductState.success;
          state.message = message;
        }
      })
      .addCase(updateStoreProduct.rejected, (state, action) => {
        state.status = UpdateStoreProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateStoreProduct = (state: RootState) =>
  state.updateStoreProduct;

export const { resetUpdateStoreProduct } = updateStoreProductSlice.actions;

export default updateStoreProductSlice.reducer;
