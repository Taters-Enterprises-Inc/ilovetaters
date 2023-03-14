import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EditAdminSettingShopProductParam } from "features/admin/core/admin.params";
import {
  EditAdminSettingShopProductRepository,
  EditAdminSettingShopProductResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum EditAdminSettingShopProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: EditAdminSettingShopProductState;
  message: string;
}

const initialState: InitialState = {
  status: EditAdminSettingShopProductState.initial,
  message: "",
};

export const editAdminSettingShopProduct = createAsyncThunk(
  "editAdminSettingShopProduct",
  async (param: EditAdminSettingShopProductParam, { rejectWithValue }) => {
    try {
      const response: EditAdminSettingShopProductResponse =
        await EditAdminSettingShopProductRepository(param);

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

export const editAdminSettingShopProductSlice = createSlice({
  name: "editAdminSettingShopProduct",
  initialState,
  reducers: {
    resetEditAdminSettingShopProductState: (state) => {
      state.status = EditAdminSettingShopProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAdminSettingShopProduct.pending, (state) => {
        state.status = EditAdminSettingShopProductState.inProgress;
      })
      .addCase(editAdminSettingShopProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = EditAdminSettingShopProductState.success;
          state.message = message;
        }
      })
      .addCase(editAdminSettingShopProduct.rejected, (state, action) => {
        state.status = EditAdminSettingShopProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectEditAdminSettingShopProduct = (state: RootState) =>
  state.editAdminSettingShopProduct;

export const { resetEditAdminSettingShopProductState } =
  editAdminSettingShopProductSlice.actions;

export default editAdminSettingShopProductSlice.reducer;
