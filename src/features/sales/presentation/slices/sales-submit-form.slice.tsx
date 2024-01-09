import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SubmitFormParam } from "features/sales/core/sales.param";
import {
  salesSubmitFormRepository,
  salesSubmitFormResponse,
} from "features/sales/data/sales.repository";

export enum salesSubmitFormState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: salesSubmitFormState;
  message: string;
}

const initialState: InitialState = {
  status: salesSubmitFormState.initial,
  message: "",
};

export const salesSubmitForm = createAsyncThunk(
  "salesSubmitForm",
  async (param: SubmitFormParam, { rejectWithValue }) => {
    try {
      const response: salesSubmitFormResponse = await salesSubmitFormRepository(
        param
      );
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
export const salesSubmitFormSlice = createSlice({
  name: "salesSubmitForm",
  initialState,
  reducers: {
    resetsalesSubmitForm: (state) => {
      state.status = salesSubmitFormState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(salesSubmitForm.pending, (state) => {
        state.status = salesSubmitFormState.inProgress;
      })
      .addCase(salesSubmitForm.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = salesSubmitFormState.success;
          state.message = message;
        }
      })
      .addCase(salesSubmitForm.rejected, (state, action) => {
        state.status = salesSubmitFormState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectsalesSubmitForm = (state: RootState) =>
  state.salesSubmitForm;

export const { resetsalesSubmitForm } = salesSubmitFormSlice.actions;
export default salesSubmitFormSlice.reducer;
