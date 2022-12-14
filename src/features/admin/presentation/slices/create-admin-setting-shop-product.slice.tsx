import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateAdminSettingShopProductParam } from "features/admin/core/admin.params";
import {
  CreateAdminSettingShopProductRepository,
  CreateAdminSettingShopProductResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminSettingShopProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminSettingShopProductState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminSettingShopProductState.initial,
  message: "",
};

export const createAdminSettingShopProduct = createAsyncThunk(
  "createAdminSettingShopProduct",
  async (param: CreateAdminSettingShopProductParam, { rejectWithValue }) => {
    try {
      const response: CreateAdminSettingShopProductResponse =
        await CreateAdminSettingShopProductRepository(param);

      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        console.log(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const createAdminSettingShopProductSlice = createSlice({
  name: "createAdminSettingShopProduct",
  initialState,
  reducers: {
    resetCreateAdminSettingShopProductState: (state) => {
      state.status = CreateAdminSettingShopProductState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminSettingShopProduct.pending, (state) => {
        state.status = CreateAdminSettingShopProductState.inProgress;
      })
      .addCase(createAdminSettingShopProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminSettingShopProductState.success;
          state.message = message;
        }
      })
      .addCase(createAdminSettingShopProduct.rejected, (state, action) => {
        state.status = CreateAdminSettingShopProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminSettingShopProduct = (state: RootState) =>
  state.createAdminSettingShopProduct;

export const { resetCreateAdminSettingShopProductState } =
  createAdminSettingShopProductSlice.actions;

export default createAdminSettingShopProductSlice.reducer;
