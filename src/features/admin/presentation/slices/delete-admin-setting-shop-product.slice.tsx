import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateAdminGroupParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  CreateAdminGroupRepository,
  CreateAdminGroupResponse,
  DeleteAdminSettingShopProductRepository,
  DeleteAdminSettingShopProductResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum DeleteAdminSettingShopProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: DeleteAdminSettingShopProductState;
  message: string;
}

const initialState: InitialState = {
  status: DeleteAdminSettingShopProductState.initial,
  message: "",
};

export const deleteAdminSettingShopProduct = createAsyncThunk(
  "deleteAdminSettingShopProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response: DeleteAdminSettingShopProductResponse =
        await DeleteAdminSettingShopProductRepository(productId);
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
export const deleteAdminSettingShopProductSlice = createSlice({
  name: "deleteAdminSettingShopProduct",
  initialState,
  reducers: {
    resetDeleteAdminSettingShopProductState: (state) => {
      state.status = DeleteAdminSettingShopProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAdminSettingShopProduct.pending, (state) => {
        state.status = DeleteAdminSettingShopProductState.inProgress;
      })
      .addCase(deleteAdminSettingShopProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = DeleteAdminSettingShopProductState.success;
          state.message = message;
        }
      })
      .addCase(deleteAdminSettingShopProduct.rejected, (state, action) => {
        state.status = DeleteAdminSettingShopProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectDeleteAdminSettingShopProduct = (state: RootState) =>
  state.deleteAdminSettingShopProduct;

export const { resetDeleteAdminSettingShopProductState } =
  deleteAdminSettingShopProductSlice.actions;

export default deleteAdminSettingShopProductSlice.reducer;
