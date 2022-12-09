import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminSettingCatersPackageModel } from "features/admin/core/domain/admin-setting-caters-package.model";
import {
  getAllCataringPackageResponse,
  getAllCataringPackageRepository,
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
}

const initialState: InitialState = {
  status: catersListStatus.initial,
  message: "",
  data: [],
};

export const getAllCataringPackageLists = createAsyncThunk(
  "getAllCataringPackageLists",
  async () => {
    try {
      const response: getAllCataringPackageResponse =
        await getAllCataringPackageRepository();
      //   console.log(response);
      return response.data;
    } catch (error: any) {
      // console.log(error);
      return error.message;
    }
  }
);

const CataringPackageListsSlice = createSlice({
  name: "CataringPackageLists",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCataringPackageLists.pending, (state, action) => {
        state.status = catersListStatus.inProgress;
      })
      .addCase(getAllCataringPackageLists.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.status = catersListStatus.success;
        state.message = message;
        state.data = data;
      })
      .addCase(getAllCataringPackageLists.rejected, (state, action) => {
        state.status = catersListStatus.fail;
        state.message = action.payload as string;
        state.data = [];
      });
  },
});

export const selectAllCataringPackageLists = (state: RootState) =>
  state.CataringPackageLists.data;

export const fetchAllCataringPackageListsStatus = (state: RootState) =>
  state.CataringPackageLists.status;
// export const { signUp } = usersListSlice.actions;

export default CataringPackageListsSlice.reducer;
