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

import getSnackShopOrderHistory from "../profile/presentation/slices/get-snackshop-order-history.slice";
import getCateringBookingHistory from "../profile/presentation/slices/get-catering-booking-history.slice";
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
import getCartItem from "features/shop/presentation/slices/get-cart-item.slice";
import editCartItem from "features/shop/presentation/slices/edit-cart-item.slice";
import addToCartCatering from "../catering/presentation/slices/add-to-cart-catering.slice";
import removeItemFromCartCatering from "../catering/presentation/slices/remove-item-from-cart-catering.slice";
import popSnackBar from "../shared/presentation/slices/pop-snackbar.slice";
import cateringCheckoutOrders from "../catering/presentation/slices/catering-checkout-orders.slice";

import cateringHomePage from "../catering/presentation/slices/catering-home-page.slice";
import shopHomePage from "../shop/presentation/slices/shop-home-page.slice";
import branchesNearYouComponent from "../branches/presentation/slices/branches-near-you-component.slice";
import storeChooserModal from "../popclub/presentation/slices/store-chooser-modal.slice";
import getCateringOrders from "../catering/presentation/slices/get-catering-orders.slice";
import uploadContract from "../catering/presentation/slices/upload-contract.slice";

import cateringUploadProofOfPayment from "../catering/presentation/slices/catering-upload-proof-of-payment.slice";
import signInMobileUser from "../shared/presentation/slices/sign-in-mobile-user.slice";

import setStoreAndAddressPopClub from "../popclub/presentation/slices/set-store-and-address-popclub.slice";
import addToCartCheckoutShop from "../shop/presentation/slices/add-to-cart-checkout-shop.slice";
import signUpMobileUser from "../shared/presentation/slices/sign-up-mobile-user.slice";
import changeForgotPasswordStatus from "../shared/presentation/slices/change-forgot-password-status.slice";
import forgotPasswordGenerateOTP from "../shared/presentation/slices/forgot-password-generate-otp.slice";
import forgotPasswordValidateOTP from "../shared/presentation/slices/forgot-password-validate-otp.slice";
import forgotPasswordNewPassword from "../shared/presentation/slices/forgot-password-new-password-otp.slice";
import loginAdmin from "features/admin/presentation/slices/login-admin.slice";
import getAdminSession from "features/admin/presentation/slices/get-admin-session.slice";
import logoutAdmin from "features/admin/presentation/slices/logout-admin.slice";
import forfeitRedeem from "features/popclub/presentation/slices/forfeit-redeem.slice";

import adminSideBar from "features/admin/presentation/slices/admin-sidebar.slice";
import getAdminShopOrders from "features/admin/presentation/slices/get-admin-shop-orders.slice";
import getAdminShopOrder from "features/admin/presentation/slices/get-admin-shop-order.slice";

import getAdminPopclubRedeems from "features/admin/presentation/slices/get-admin-popclub-redeems.slice";
import getAdminPopclubRedeem from "features/admin/presentation/slices/get-admin-popclub-redeem.slice";

import adminCompleteRedeem from "features/admin/presentation/slices/admin-complete-redeem.slice";
import storeVisitStoreChooserModal from "features/popclub/presentation/slices/store-visit-store-chooser-modal.slice";
import getStoresAvailablePopClubStoreVisit from "features/popclub/presentation/slices/get-stores-available-popclub-store-visit.slice";
import getAdminUsers from "features/admin/presentation/slices/get-admin-users.slice";
import createAdminUser from "features/admin/presentation/slices/create-admin-user.slice";
import getAdminUser from "features/admin/presentation/slices/get-admin-user.slice";
import getAdminGroups from "features/admin/presentation/slices/get-admin-groups.slice";
import editAdminUser from "features/admin/presentation/slices/edit-admin-user.slice";
import getAdminUserStores from "features/admin/presentation/slices/get-admin-user-stores.slice";
import getAdminStores from "features/admin/presentation/slices/get-admin-stores.slice";
import updateAdminUserStores from "features/admin/presentation/slices/update-user-stores.slice";
import createAdminGroup from "features/admin/presentation/slices/create-admin-group.slice";

import uploadProofOfPaymentAdmin from "features/admin/presentation/slices/upload-proof-of-payment-admin.slice";
import validateReferenceNumberAdmin from "features/admin/presentation/slices/validate-reference-number.slice";
import adminShopOrderUpdateStatus from "features/admin/presentation/slices/admin-shop-order-update-status.slice";
import adminPrivilege from "features/admin/presentation/slices/admin-privilege.slice";

import getAdminCateringBookings from "features/admin/presentation/slices/get-admin-catering-bookings.slice";
import getAdminCateringBooking from "features/admin/presentation/slices/get-admin-catering-booking.slice";
import adminCateringBookingUpdateStatus from "features/admin/presentation/slices/admin-catering-booking-update-status.slice";
import getPopclubRedeemsHistory from "features/profile/presentation/slices/get-popclub-redeems-history.slice";
import redeemValidators from "features/popclub/presentation/slices/redeem-validators.slice";
import getAdminStoreDeals from "features/admin/presentation/slices/get-admin-stores-deals.slice";
import updateStoreDeal from "features/admin/presentation/slices/update-store-deal.slice";
import getAdminStoreProducts from "features/admin/presentation/slices/get-admin-stores-products.slice";
import getProductCategories from "features/admin/presentation/slices/get-product-categories.slice";
import updateStoreProduct from "features/admin/presentation/slices/update-store-product.slice";
import getAdminSettingStores from "features/admin/presentation/slices/get-admin-setting-stores.slice";
import updateAdminSettingStore from "features/admin/presentation/slices/update-setting-store.slice";
import adminDeclineRedeem from "features/admin/presentation/slices/admin-decline-redeem.slice";

import getAdminStore from "features/admin/presentation/slices/get-admin-store.slice";
import updateAdminSettingStoreOperatingHours from "features/admin/presentation/slices/update-setting-store-operating-hours.slice";

export const store = configureStore({
  reducer: {
    getAllPlatform,
    getAllPlatformCategories,
    getDeals,
    setPopClubData,
    getPopClubData,
    getStoresAvailableSnackshop,
    getStoresAvailableCatering,
    getStoresAvailableBranches,
    getStoresAvailablePopClub,
    setStoreAndAddress,
    getSession,
    setSession,
    getAllAvailableStores,
    getDeal,
    getDealProductVariants,
    redeemDeal,
    getRedeems,
    getRedeem,
    getLatestUnexpiredRedeem,
    getCategoryProducts,
    getProductDetails,
    getCartItem,
    editCartItem,
    addToCartShop,
    addToCartCheckoutShop,
    getBranchesStore,
    checkoutOrders,
    getOrders,
    getSnackShopOrderHistory,
    getCateringBookingHistory,
    facebookLogin,
    facebookLoginPoint,
    facebookLogout,
    storeReset,
    getCateringCategoryProducts,
    getProductSku,
    removeItemFromCartShop,
    uploadProofOfPayment,
    addContact,
    updateContact,
    deleteContact,
    getContacts,
    getCateringProductDetails,
    addToCartCatering,
    removeItemFromCartCatering,
    popSnackBar,
    cateringCheckoutOrders,
    cateringHomePage,
    shopHomePage,
    branchesNearYouComponent,
    storeChooserModal,
    getCateringOrders,
    uploadContract,
    cateringUploadProofOfPayment,
    signInMobileUser,
    setStoreAndAddressPopClub,
    signUpMobileUser,
    changeForgotPasswordStatus,
    forgotPasswordGenerateOTP,
    forgotPasswordValidateOTP,
    forgotPasswordNewPassword,
    forfeitRedeem,
    loginAdmin,
    logoutAdmin,
    getAdminSession,
    adminSideBar,
    getAdminShopOrders,
    getAdminShopOrder,
    getAdminPopclubRedeems,
    getAdminPopclubRedeem,
    adminCompleteRedeem,
    storeVisitStoreChooserModal,
    getStoresAvailablePopClubStoreVisit,
    getAdminUsers,
    createAdminUser,
    getAdminUser,
    getAdminGroups,
    editAdminUser,
    getAdminUserStores,
    getAdminStores,
    updateAdminUserStores,
    createAdminGroup,
    uploadProofOfPaymentAdmin,
    validateReferenceNumberAdmin,
    adminShopOrderUpdateStatus,
    adminPrivilege,
    getAdminCateringBookings,
    getAdminCateringBooking,
    adminCateringBookingUpdateStatus,
    getPopclubRedeemsHistory,
    redeemValidators,
    getAdminStoreDeals,
    updateStoreDeal,
    getAdminStoreProducts,
    getProductCategories,
    updateStoreProduct,
    getAdminSettingStores,
    updateAdminSettingStore,
    adminDeclineRedeem,
    getAdminStore,
    updateAdminSettingStoreOperatingHours,
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
