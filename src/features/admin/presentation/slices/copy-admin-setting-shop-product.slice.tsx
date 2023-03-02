import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CopyAdminSettingShopProductParam } from "features/admin/core/admin.params";
import {
  CopyAdminSettingShopProductRepository,
  CopyAdminSettingShopProductResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CopyAdminSettingShopProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CopyAdminSettingShopProductState;
  message: string;
}

const initialState: InitialState = {
  status: CopyAdminSettingShopProductState.initial,
  message: "",
};

export const copyAdminSettingShopProduct = createAsyncThunk(
  "copyAdminSettingShopProduct",
  async (param: CopyAdminSettingShopProductParam, { rejectWithValue }) => {
    try {
      const response: CopyAdminSettingShopProductResponse =
        await CopyAdminSettingShopProductRepository(param);

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

export const copyAdminSettingShopProductSlice = createSlice({
  name: "copyAdminSettingShopProduct",
  initialState,
  reducers: {
    resetCopyAdminSettingShopProductState: (state) => {
      state.status = CopyAdminSettingShopProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(copyAdminSettingShopProduct.pending, (state) => {
        state.status = CopyAdminSettingShopProductState.inProgress;
      })
      .addCase(copyAdminSettingShopProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CopyAdminSettingShopProductState.success;
          state.message = message;
        }
      })
      .addCase(copyAdminSettingShopProduct.rejected, (state, action) => {
        state.status = CopyAdminSettingShopProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCopyAdminSettingShopProduct = (state: RootState) =>
  state.copyAdminSettingShopProduct;

export const { resetCopyAdminSettingShopProductState } =
  copyAdminSettingShopProductSlice.actions;

export default copyAdminSettingShopProductSlice.reducer;
