import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateCatersPackageParam } from "features/admin/core/admin.params";
import { AdminSettingCatersPackageModel } from "features/admin/core/domain/admin-setting-caters-package.model";
import {
  getAllCataringPackageResponse,
  getAllCataringPackageRepository,
  createNewCataringPackageRepository,
  createNewCataringPackageResponse,
  deleteCataringPackageRepository,
  deleteCataringPackageResponse,
  UpdateCataringPackageRepository,
  UpdateCataringPackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum catersListStatus {
  initial,
  inProgress,
  success,
  fail,
}

export enum createCatersStatus {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: catersListStatus;
  createstatus: createCatersStatus;
  message: string;
  data: AdminSettingCatersPackageModel[];
  pagination: {
    total_rows: number;
    per_page: number;
  };
}

const initialState: InitialState = {
  status: catersListStatus.initial,
  createstatus: createCatersStatus.initial,
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
      // console.log(response);
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
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);

      return error.message;
    }
  }
);

export const updateCataringPackage = createAsyncThunk(
  "updateCataringPackage",
  async (query: UpdateCatersPackageParam) => {
    try {
      const response: UpdateCataringPackageResponse =
        await UpdateCataringPackageRepository(query);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);

      return error.message;
    }
  }
);

export const deleteCataringPackage = createAsyncThunk(
  "deleteCataringPackage",
  async (query: any) => {
    try {
      const response: deleteCataringPackageResponse =
        await deleteCataringPackageRepository(query);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error.response);

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
    resetCreateCaterPackageStatus: (state) => {
      state.createstatus = createCatersStatus.initial;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCataringPackageLists.pending, (state, action) => {
        state.status = catersListStatus.inProgress;
      })
      .addCase(getAllCataringPackageLists.fulfilled, (state, action) => {
        const { data, message, pagination } = action.payload;
        // console.log(action.payload);
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
      .addCase(createCataringPackage.pending, (state, action) => {
        state.createstatus = createCatersStatus.inProgress;
      })
      .addCase(createCataringPackage.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.createstatus = createCatersStatus.success;
      })
      .addCase(createCataringPackage.rejected, (state, action) => {
        state.createstatus = createCatersStatus.fail;
      })
      .addCase(updateCataringPackage.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (id) {
          state.createstatus = createCatersStatus.success;
        } else {
          state.createstatus = createCatersStatus.fail;
        }
      })
      .addCase(deleteCataringPackage.fulfilled, (state, action) => {
        const { id } = action.payload;
        const packages = state.data.filter(
          (currData) => Number(currData.id) !== Number(id)
        );
        state.data = packages;
      });
  },
});

export const getCreateCatersStatus = (state: RootState) =>
  state.CataringPackageLists.createstatus;

export const getFetchAllCatersStatus = (state: RootState) =>
  state.CataringPackageLists.status;

export const selectAllCataringPackageLists = (state: RootState) =>
  state.CataringPackageLists.data;

export const selectCatersPackageByID = (state: RootState, id: number) =>
  state.CataringPackageLists.data.find(
    (currentpackage) => currentpackage.id === id
  );

export const getPagination = (state: RootState) =>
  state.CataringPackageLists.pagination;

//Reducers
export const { resetCreateCaterPackageStatus } =
  CataringPackageListsSlice.actions;
export const { resetGetCataringPackageListsStatus } =
  CataringPackageListsSlice.actions;

export default CataringPackageListsSlice.reducer;
