import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableSurveyState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoresAvailableSurveyState;
  data: Array<RegionModel> | undefined;
  search: Array<StoreModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoresAvailableSurveyState.initial,
  data: undefined,
  message: "",
  search: undefined,
};

export const getStoresAvailableSurvey = createAsyncThunk(
  "getStoresAvailableSurvey",
  async (param: GetStoresAvailableParam, { rejectWithValue }) => {
    try {
      const response: GetStoresAvailableResponse =
        await GetStoresAvailableRepository(param);
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
export const getStoresAvailableSurveySlice = createSlice({
  name: "getStoresAvailableSurvey",
  initialState,
  reducers: {
    searchSurvey: (
      state,
      action: PayloadAction<{ stores: Array<StoreModel> }>
    ) => {
      state.search = action.payload.stores;
    },
    resetSurveySearch: (state) => {
      state.search = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoresAvailableSurvey.pending, (state) => {
        state.status = GetStoresAvailableSurveyState.inProgress;
      })
      .addCase(getStoresAvailableSurvey.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetStoresAvailableSurveyState.success;

          state.data = data;
          state.message = message;
        }
      })
      .addCase(getStoresAvailableSurvey.rejected, (state, action) => {
        state.status = GetStoresAvailableSurveyState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStoresAvailableSurvey = (state: RootState) =>
  state.getStoresAvailableSurvey;

export const { resetSurveySearch, searchSurvey } =
  getStoresAvailableSurveySlice.actions;

export default getStoresAvailableSurveySlice.reducer;
