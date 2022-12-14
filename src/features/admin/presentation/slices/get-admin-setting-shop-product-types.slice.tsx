import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminSettingShopProductTypesRepository,
  GetAdminSettingShopProductTypesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";
import { ProductTypeModel } from "features/shared/core/domain/product_type.model";

export enum GetAdminSettingShopProductTypesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingShopProductTypesState;
  message: string;
  data: Array<ProductTypeModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingShopProductTypesState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingShopProductTypes = createAsyncThunk(
  "getAdminSettingShopProductTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingShopProductTypesResponse =
        await GetAdminSettingShopProductTypesRepository();
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
const getAdminSettingShopProductTypesSlice = createSlice({
  name: "getAdminSettingShopProductTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingShopProductTypes.pending, (state) => {
        state.status = GetAdminSettingShopProductTypesState.inProgress;
      })
      .addCase(getAdminSettingShopProductTypes.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingShopProductTypesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingShopProductTypes.rejected, (state, action) => {
        state.status = GetAdminSettingShopProductTypesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingShopProductTypes = (state: RootState) =>
  state.getAdminSettingShopProductTypes;

export default getAdminSettingShopProductTypesSlice.reducer;
