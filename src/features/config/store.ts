import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import getAllPlatform from "../popclub/presentation/slices/get-all-platform.slice";
import getAllPlatformCategories from "../popclub/presentation/slices/get-all-platform-categories.slice";
import getDeals from "../popclub/presentation/slices/get-deals.slice";
import getPopClubData from "../popclub/presentation/slices/get-popclub-data.slice";
import setPopClubData from "../popclub/presentation/slices/set-popclub-data.slice";
import setStoreAndAddress from "../shared/presentation/slices/set-store-and-address.slice";
import getSession from "../shared/presentation/slices/get-session.slice";
import setSession from "../shared/presentation/slices/set-session.slice";
import getAllAvailableStores from "../popclub/presentation/slices/get-all-available-stores.slice";
import getDeal from "../popclub/presentation/slices/get-deal.slice";
import getDealProductVariants from "../popclub/presentation/slices/get-deal-product-variants.slice";
import redeemDeal from "../popclub/presentation/slices/redeem-deal.slice";
import getRedeems from "../popclub/presentation/slices/get-redeems.slice";
import getRedeem from "../popclub/presentation/slices/get-redeem.slice";
import getLatestUnexpiredRedeem from "../popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import getCategoryProducts from "../shop/presentation/slices/get-category-products.slice";
import getProductDetails from "../shop/presentation/slices/get-product-details.slice";
import addToCartShop from "../shop/presentation/slices/add-to-cart-shop.slice";
import getBranchesStore from "../branches/presentation/slices/get-branches-store";
import checkoutOrders from "../shop/presentation/slices/checkout-orders.slice";
import getOrders from "../shop/presentation/slices/get-orders.slice";

import getSnackShopOrderHistory from "../shop/presentation/slices/get-snackshop-order-history.slice";
import getCateringBookingHistory from "../shop/presentation/slices/get-catering-booking-history.slice";
import facebookLogin from "../shared/presentation/slices/facebook-login.slice";
import facebookLoginPoint from "../shared/presentation/slices/facebook-login-point.slice";
import facebookLogout from "../shared/presentation/slices/facebook-logout.slice";
import storeReset from "../shared/presentation/slices/store-reset.slice";

import getCateringCategoryProducts from "../catering/presentation/slices/get-catering-category-products.slice";
import getProductSku from "../shop/presentation/slices/get-product-sku.slice";
import removeItemFromCartShop from "../shop/presentation/slices/remove-item-from-cart-shop.slice";
import uploadProofOfPayment from "../shared/presentation/slices/upload-proof-of-payment.slice";

import addContact from "../shared/presentation/slices/add-contact.slice";
import deleteContact from "../shared/presentation/slices/delete-contact.slice";
import updateContact from "../shared/presentation/slices/update-contact.slice";
import getContacts from "../shared/presentation/slices/get-contacts.slice";

import getStoresAvailableSnackshop from "../shop/presentation/slices/get-stores-available-snackshop.slice";
import getStoresAvailableCatering from "../catering/presentation/slices/get-stores-available-catering.slice";
import getStoresAvailableBranches from "../branches/presentation/slices/get-stores-available-branches.slice";
import getStoresAvailablePopClub from "../popclub/presentation/slices/get-stores-available-popclub.slice";

import getCateringProductDetails from "../catering/presentation/slices/get-catering-product-details.slice";
import addToCartCatering from "../catering/presentation/slices/add-to-cart-catering.slice";
import removeItemFromCartCatering from "../catering/presentation/slices/remove-item-from-cart-catering.slice";
import popSnackBar from "../shared/presentation/slices/pop-snackbar.slice";

export const store = configureStore({
  reducer: {
    getAllPlatform: getAllPlatform,
    getAllPlatformCategories: getAllPlatformCategories,
    getDeals: getDeals,

    setPopClubData: setPopClubData,
    getPopClubData: getPopClubData,

    getStoresAvailableSnackshop: getStoresAvailableSnackshop,
    getStoresAvailableCatering: getStoresAvailableCatering,
    getStoresAvailableBranches: getStoresAvailableBranches,
    getStoresAvailablePopClub: getStoresAvailablePopClub,

    setStoreAndAddress: setStoreAndAddress,
    getSession: getSession,
    setSession: setSession,
    getAllAvailableStores: getAllAvailableStores,
    getDeal: getDeal,
    getDealProductVariants: getDealProductVariants,

    redeemDeal: redeemDeal,
    getRedeems: getRedeems,
    getRedeem: getRedeem,
    getLatestUnexpiredRedeem: getLatestUnexpiredRedeem,

    getCategoryProducts: getCategoryProducts,
    getProductDetails: getProductDetails,
    addToCartShop: addToCartShop,

    getBranchesStore: getBranchesStore,
    checkoutOrders: checkoutOrders,
    getOrders: getOrders,
    getSnackShopOrderHistory: getSnackShopOrderHistory,
    getCateringBookingHistory: getCateringBookingHistory,

    facebookLogin: facebookLogin,
    facebookLoginPoint: facebookLoginPoint,
    facebookLogout: facebookLogout,
    storeReset: storeReset,

    getCateringCategoryProducts: getCateringCategoryProducts,
    getProductSku: getProductSku,
    removeItemFromCartShop: removeItemFromCartShop,
    uploadProofOfPayment: uploadProofOfPayment,
    addContact: addContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    getContacts: getContacts,

    getCateringProductDetails: getCateringProductDetails,
    addToCartCatering: addToCartCatering,
    removeItemFromCartCatering: removeItemFromCartCatering,
    popSnackBar: popSnackBar,
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
