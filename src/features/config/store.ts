import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import getAllPlatform from '../popclub/presentation/slices/get-all-platform.slice';
import getAllPlatformCategories from '../popclub/presentation/slices/get-all-platform-categories.slice';
import getDeals from '../popclub/presentation/slices/get-deals.slice';
import getPopClubData from '../popclub/presentation/slices/get-popclub-data.slice';
import setPopClubData from '../popclub/presentation/slices/set-popclub-data.slice';
import getStoresAvailable from '../popclub/presentation/slices/get-stores-available-slice';
import setStoreAndAddress from '../popclub/presentation/slices/set-store-and-address.slice';
import getSession from '../popclub/presentation/slices/get-session.slice';
import setSession from '../popclub/presentation/slices/set-session.slice';
import getAllAvailableStores from '../popclub/presentation/slices/get-all-available-stores.slice';
import getDeal from '../popclub/presentation/slices/get-deal.slice';
import getDealProductVariants from '../popclub/presentation/slices/get-deal-product-variants.slice';
import redeemDeal from '../popclub/presentation/slices/redeem-deal.slice';

export const store = configureStore({
  reducer: {
    getAllPlatform : getAllPlatform,
    getAllPlatformCategories: getAllPlatformCategories,
    getDeals: getDeals,

    setPopClubData: setPopClubData,
    getPopClubData: getPopClubData,

    getStoresAvailable: getStoresAvailable,
    setStoreAndAddress: setStoreAndAddress,
    getSession: getSession,
    setSession: setSession,
    getAllAvailableStores: getAllAvailableStores,
    getDeal: getDeal,
    getDealProductVariants: getDealProductVariants,
    
    redeemDeal: redeemDeal,
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
