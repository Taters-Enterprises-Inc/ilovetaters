import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

const initialState: {
  address: string | null;
  eventStartDate: Date | null;
  eventEndDate: Date | null;
} = {
  address: null,
  eventStartDate: null,
  eventEndDate: null,
};

export const cateringHomePageSlice = createSlice({
  name: "cateringHomePage",
  initialState,
  reducers: {
    setAddressCateringHomePage: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
    setEventStartDateCateringHomePage: (
      state,
      action: PayloadAction<{ eventStartDate: Date }>
    ) => {
      state.eventStartDate = action.payload.eventStartDate;
    },
    setEventEndDateCateringHomePage: (
      state,
      action: PayloadAction<{ eventEndDate: Date }>
    ) => {
      state.eventEndDate = action.payload.eventEndDate;
    },
  },
});

export const selectCateringHomePage = (state: RootState) =>
  state.cateringHomePage;

export const {
  setAddressCateringHomePage,
  setEventStartDateCateringHomePage,
  setEventEndDateCateringHomePage,
} = cateringHomePageSlice.actions;

export default cateringHomePageSlice.reducer;
