import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import getAllPlatform from '../popclub/presentation/slices/get-all-platform.slice';
import getAllPlatformCategories from '../popclub/presentation/slices/get-all-platform-categories.slice';
import getDeals from '../popclub/presentation/slices/get-deals.slice';
import getPopClubData from '../popclub/presentation/slices/get-popclub-data.slice';
import setPopClubData from '../popclub/presentation/slices/set-popclub-data.slice';

export const store = configureStore({
  reducer: {
    getAllPlatform : getAllPlatform,
    getAllPlatformCategories: getAllPlatformCategories,
    getDeals: getDeals,

    setPopClubData: setPopClubData,
    getPopClubData: getPopClubData,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
