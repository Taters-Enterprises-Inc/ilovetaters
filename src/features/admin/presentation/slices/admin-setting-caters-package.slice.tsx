import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminSettingCatersPackageModel } from "features/admin/core/domain/admin-setting-caters-package.model";
import {
  getAllCataringPackageResponse,
  getAllCataringPackageRepository,
  createNewCataringPackageRepository,
  createNewCataringPackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum catersListStatus {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: catersListStatus;
  message: string;
  data: AdminSettingCatersPackageModel[];
  pagination: {
    total_rows: number;
    per_page: number;
  };
}

const initialState: InitialState = {
  status: catersListStatus.initial,
  message: "",
  data: [],
  pagination: {
    total_rows: 0,
    per_page: 25,
  },
};

export const getAllCataringPackageLists = createAsyncThunk(
  "getAllCataringPackageLists",
  async (query: string | null) => {
    try {
      const response: getAllCataringPackageResponse =
        await getAllCataringPackageRepository(query);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  }
);

export const createCataringPackage = createAsyncThunk(
  "createCataringPackage",
  async (query: any) => {
    try {
      const response: createNewCataringPackageResponse =
        await createNewCataringPackageRepository(query);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);

      return error.message;
    }
  }
);

const CataringPackageListsSlice = createSlice({
  name: "CataringPackageLists",
  initialState,
  reducers: {
    resetGetCataringPackageListsStatus: (state) => {
      state.status = catersListStatus.inProgress;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCataringPackageLists.pending, (state, action) => {
        state.status = catersListStatus.inProgress;
      })
      .addCase(getAllCataringPackageLists.fulfilled, (state, action) => {
        const { data, message, pagination } = action.payload;
        console.log(action.payload);
        state.status = catersListStatus.success;
        state.message = message;
        state.data = data;
        state.pagination = pagination;
      })
      .addCase(getAllCataringPackageLists.rejected, (state, action) => {
        state.status = catersListStatus.fail;
        state.message = action.payload as string;
        state.data = [];
        state.pagination = {
          total_rows: 0,
          per_page: 25,
        };
      })
      .addCase(createCataringPackage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data.push(action.payload);
      });
  },
});

export const selectAllCataringPackageLists = (state: RootState) =>
  state.CataringPackageLists.data;

export const getPagination = (state: RootState) =>
  state.CataringPackageLists.pagination;

export const { resetGetCataringPackageListsStatus } =
  CataringPackageListsSlice.actions;

export default CataringPackageListsSlice.reducer;
