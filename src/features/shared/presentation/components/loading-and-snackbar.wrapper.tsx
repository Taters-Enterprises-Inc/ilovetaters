import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  GetCategoryProductsState,
  selectGetCategoryProducts,
} from "features/shop/presentation/slices/get-category-products.slice";
import {
  GetProductDetailsState,
  selectGetProductDetails,
} from "features/shop/presentation/slices/get-product-details.slice";

import {
  resetStoreAndAddress,
  selectSetStoreAndAddress,
  SetStoreAndAddressState,
} from "../slices/set-store-and-address.slice";
import {
  FacebookLoginState,
  selectFacebookLogin,
} from "../slices/facebook-login.slice";
import {
  FacebookLoginPointState,
  selectFacebookLoginPoint,
} from "../slices/facebook-login-point.slice";
import {
  selectUploadProofOfPayment,
  UploadProofOfPaymentState,
} from "../slices/upload-proof-of-payment.slice";
import { AddContactState, selectAddContact } from "../slices/add-contact.slice";
import {
  DeleteContactState,
  selectDeleteContact,
} from "../slices/delete-contact.slice";
import {
  selectUpdateContact,
  UpdateContactState,
} from "../slices/update-contact.slice";
import {
  GetStoresAvailableSnackshopState,
  selectGetStoresAvailableSnackshop,
} from "features/shop/presentation/slices/get-stores-available-snackshop.slice";
import { BackdropLoading } from "./backdrop-loading-wrapper";
import {
  GetStoresAvailableCateringState,
  selectGetStoresAvailableCatering,
} from "features/catering/presentation/slices/get-stores-available-catering.slice";
import {
  AddToCartShopState,
  selectAddToCartShop,
} from "features/shop/presentation/slices/add-to-cart-shop.slice";
import { SnackbarAlert } from "./snackbar-alert";
import {
  popOutSnackBar,
  PopSnackBarState,
  selectPopSnackBar,
} from "../slices/pop-snackbar.slice";
import {
  RemoveItemFromCartShopState,
  selectRemoveItemFromCartShop,
} from "features/shop/presentation/slices/remove-item-from-cart-shop.slice";
import {
  AddToCartCateringState,
  selectAddToCartCatering,
} from "features/catering/presentation/slices/add-to-cart-catering.slice";
import {
  CheckoutOrdersState,
  selectCheckoutOrders,
} from "features/shop/presentation/slices/checkout-orders.slice";
import {
  CateringCheckoutOrdersState,
  selectCateringCheckoutOrders,
} from "features/catering/presentation/slices/catering-checkout-orders.slice";
import {
  selectUploadContract,
  UploadContractState,
} from "features/catering/presentation/slices/upload-contract.slice";
import {
  CateringUploadProofOfPaymentState,
  selectCateringUploadProofOfPayment,
} from "features/catering/presentation/slices/catering-upload-proof-of-payment.slice";
import {
  selectSignInMobileUser,
  SignInMobileUserState,
} from "../slices/sign-in-mobile-user.slice";
import { BackdropLoadingPopClub } from "features/popclub/presentation/components";
import {
  GetStoresAvailablePopClubState,
  selectGetStoresAvailablePopClub,
} from "features/popclub/presentation/slices/get-stores-available-popclub.slice";
import {
  GetDealsState,
  selectGetDeals,
} from "features/popclub/presentation/slices/get-deals.slice";
import {
  selectSetStoreAndAddressPopClub,
  SetStoreAndAddressPopClubState,
} from "features/popclub/presentation/slices/set-store-and-address-popclub.slice";
import {
  RedeemDealState,
  selectRedeemDeal,
} from "features/popclub/presentation/slices/redeem-deal.slice";
import {
  selectSignUpMobileUser,
  signUpMobileUser,
  SignUpMobileUserState,
} from "../slices/sign-up-mobile-user.slice";
import {
  ForgotPasswordGenerateOTPState,
  selectForgotPasswordGenerateOTP,
} from "../slices/forgot-password-generate-otp.slice";
import {
  ForgotPasswordValidateOTPState,
  selectForgotPasswordValidateOTP,
} from "../slices/forgot-password-validate-otp.slice";
import {
  ForgotPasswordNewPasswordState,
  selectForgotPasswordNewPassword,
} from "../slices/forgot-password-new-password-otp.slice";
import {
  GetDealState,
  selectGetDeal,
} from "features/popclub/presentation/slices/get-deal.slice";
import {
  GetDealProductVariantsState,
  selectGetDealProductVariants,
} from "features/popclub/presentation/slices/get-deal-product-variants.slice";
import {
  GetRedeemState,
  selectGetRedeem,
} from "features/popclub/presentation/slices/get-redeem.slice";
import {
  EditCartItemState,
  selectEditCartItem,
} from "features/shop/presentation/slices/edit-cart-item.slice";
import {
  GetAdminShopOrdersState,
  selectGetAdminShopOrders,
} from "features/admin/presentation/slices/get-admin-shop-orders.slice";
import {
  GetAdminShopOrderState,
  selectGetAdminShopOrder,
} from "features/admin/presentation/slices/get-admin-shop-order.slice";
import {
  LoginAdminState,
  selectLoginAdmin,
} from "features/admin/presentation/slices/login-admin.slice";
import {
  GetAdminSessionState,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";
import {
  GetAdminPopclubRedeemState,
  selectGetAdminPopclubRedeem,
} from "features/admin/presentation/slices/get-admin-popclub-redeem.slice";
import {
  GetAdminUsersState,
  selectGetAdminUsers,
} from "features/admin/presentation/slices/get-admin-users.slice";
import {
  CreateAdminUserState,
  selectCreateAdminUser,
} from "features/admin/presentation/slices/create-admin-user.slice";
import {
  GetAdminUserState,
  selectGetAdminUser,
} from "features/admin/presentation/slices/get-admin-user.slice";
import {
  GetAdminGroupsState,
  selectGetAdminGroups,
} from "features/admin/presentation/slices/get-admin-groups.slice";
import {
  EditAdminUserState,
  selectEditAdminUser,
} from "features/admin/presentation/slices/edit-admin-user.slice";
import {
  GetAdminUserStoresState,
  selectGetAdminUserStores,
} from "features/admin/presentation/slices/get-admin-user-stores.slice";
import {
  GetAdminStoresState,
  selectGetAdminStores,
} from "features/admin/presentation/slices/get-admin-stores.slice";
import {
  selectUpdateAdminUserStores,
  UpdateAdminUserStoresState,
} from "features/admin/presentation/slices/update-user-stores.slice";
import {
  CreateAdminGroupState,
  selectCreateAdminGroup,
} from "features/admin/presentation/slices/create-admin-group.slice";
import {
  selectUploadProofOfPaymentAdmin,
  UploadProofOfPaymentAdminState,
} from "features/admin/presentation/slices/upload-proof-of-payment-admin.slice";
import {
  selectValidateReferenceNumberAdmin,
  ValidateReferenceNumberAdminState,
} from "features/admin/presentation/slices/validate-reference-number.slice";
import {
  AdminShopOrderUpdateStatusState,
  selectAdminShopOrderUpdateStatus,
} from "features/admin/presentation/slices/admin-shop-order-update-status.slice";
import {
  AdminPrivilegeState,
  selectAdminPrivilege,
} from "features/admin/presentation/slices/admin-privilege.slice";
import {
  AdminCateringBookingUpdateStatusState,
  selectAdminCateringBookingUpdateStatus,
} from "features/admin/presentation/slices/admin-catering-booking-update-status.slice";
import {
  selectUpdateStoreDeal,
  UpdateStoreDealState,
} from "features/admin/presentation/slices/update-store-deal.slice";
import {
  selectUpdateAdminSettingStore,
  UpdateAdminSettingStoreState,
} from "features/admin/presentation/slices/update-setting-store.slice";
import {
  AdminDeclineRedeemState,
  selectAdminDeclineRedeem,
} from "features/admin/presentation/slices/admin-decline-redeem.slice";
import {
  GetAdminStoreState,
  selectGetAdminStore,
} from "features/admin/presentation/slices/get-admin-store.slice";
import {
  selectUpdateAdminSettingStoreOperatingHours,
  UpdateAdminSettingStoreOperatingHoursState,
} from "features/admin/presentation/slices/update-setting-store-operating-hours.slice";
import {
  GetAdminSettingStoresState,
  selectGetAdminSettingStores,
} from "features/admin/presentation/slices/get-admin-setting-stores.slice";
import {
  selectUpdateStoreProduct,
  UpdateStoreProductState,
} from "features/admin/presentation/slices/update-store-product.slice";

export function LoadingAndSnackbarWrapper() {
  const [openBackdropLoading, setOpenBackdropLoading] = useState(false);
  const [openBackdropPopClubLoading, setOpenBackdropPopClubLoading] =
    useState(false);
  const [successAlert, setSuccessAlert] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
  });

  const [failsAlert, setFailsAlert] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
  });

  const dispatch = useAppDispatch();

  const getStoresAvailableSnackshopState = useAppSelector(
    selectGetStoresAvailableSnackshop
  );
  const getCategoryProductsState = useAppSelector(selectGetCategoryProducts);
  const getProductDetailsState = useAppSelector(selectGetProductDetails);
  const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);
  const addToCartShopState = useAppSelector(selectAddToCartShop);
  const facebookLoginState = useAppSelector(selectFacebookLogin);
  const facebookLoginPointState = useAppSelector(selectFacebookLoginPoint);
  const removeItemFromCartShopState = useAppSelector(
    selectRemoveItemFromCartShop
  );
  const uploadProofOfPaymentState = useAppSelector(selectUploadProofOfPayment);
  const addContactState = useAppSelector(selectAddContact);
  const deleteContactState = useAppSelector(selectDeleteContact);
  const updateContactState = useAppSelector(selectUpdateContact);
  const getStoresAvailableCateringState = useAppSelector(
    selectGetStoresAvailableCatering
  );
  const popSnackBarState = useAppSelector(selectPopSnackBar);
  const addToCartCateringState = useAppSelector(selectAddToCartCatering);
  const checkoutOrdersState = useAppSelector(selectCheckoutOrders);
  const cateringCheckoutOrdersState = useAppSelector(
    selectCateringCheckoutOrders
  );
  const uploadContractState = useAppSelector(selectUploadContract);
  const cateringUploadProofOfPaymentState = useAppSelector(
    selectCateringUploadProofOfPayment
  );
  const signInMobileUserState = useAppSelector(selectSignInMobileUser);
  const getStoresAvailablePopClubState = useAppSelector(
    selectGetStoresAvailablePopClub
  );
  const getDealsState = useAppSelector(selectGetDeals);
  const setStoreAndAddressPopClub = useAppSelector(
    selectSetStoreAndAddressPopClub
  );
  const redeemDealState = useAppSelector(selectRedeemDeal);
  const signUpMobileUserState = useAppSelector(selectSignUpMobileUser);
  const forgotPasswordGenerateOTP = useAppSelector(
    selectForgotPasswordGenerateOTP
  );
  const forgotPasswordValidateOTP = useAppSelector(
    selectForgotPasswordValidateOTP
  );
  const forgotPasswordNewPasswordOTP = useAppSelector(
    selectForgotPasswordNewPassword
  );
  const getDealState = useAppSelector(selectGetDeal);
  const getDealProductVariantsState = useAppSelector(
    selectGetDealProductVariants
  );
  const getRedeemState = useAppSelector(selectGetRedeem);
  const editCartProduct = useAppSelector(selectEditCartItem);
  const getAdminShopOrdersState = useAppSelector(selectGetAdminShopOrders);
  const getAdminShopOrderState = useAppSelector(selectGetAdminShopOrder);
  const loginAdminState = useAppSelector(selectLoginAdmin);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getAdminPopclubRedeemState = useAppSelector(
    selectGetAdminPopclubRedeem
  );

  const getAdminUsersState = useAppSelector(selectGetAdminUsers);
  const createAdminUserState = useAppSelector(selectCreateAdminUser);
  const editAdminUserState = useAppSelector(selectEditAdminUser);
  const getAdminUserState = useAppSelector(selectGetAdminUser);
  const getAdminGroupsState = useAppSelector(selectGetAdminGroups);
  const getAdminUserStores = useAppSelector(selectGetAdminUserStores);
  const getAdminStores = useAppSelector(selectGetAdminStores);
  const updateAdminUserStores = useAppSelector(selectUpdateAdminUserStores);
  const createAdminGroupState = useAppSelector(selectCreateAdminGroup);
  const uploadProofOfPaymentAdminState = useAppSelector(
    selectUploadProofOfPaymentAdmin
  );
  const validateReferenceNumberAdminState = useAppSelector(
    selectValidateReferenceNumberAdmin
  );
  const adminShopOrderUpdateStatusState = useAppSelector(
    selectAdminShopOrderUpdateStatus
  );
  const adminPrivilegeState = useAppSelector(selectAdminPrivilege);

  const adminCateringBookingUpdateStatusState = useAppSelector(
    selectAdminCateringBookingUpdateStatus
  );

  const updateStoreDealState = useAppSelector(selectUpdateStoreDeal);

  const updateAdminSettingStoreState = useAppSelector(
    selectUpdateAdminSettingStore
  );

  const adminDeclineRedeemState = useAppSelector(selectAdminDeclineRedeem);
  const getAdminStoreState = useAppSelector(selectGetAdminStore);
  const getAdminSettingStoresState = useAppSelector(
    selectGetAdminSettingStores
  );
  const updateAdminSettingStoreOperatingHoursState = useAppSelector(
    selectUpdateAdminSettingStoreOperatingHours
  );
  const updateStoreProductState = useAppSelector(selectUpdateStoreProduct);

  useEffect(() => {
    switch (updateStoreProductState.status) {
      case UpdateStoreProductState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateStoreProductState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreProductState.success:
        showAlert(setSuccessAlert, updateStoreProductState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreProductState.fail:
        showAlert(setFailsAlert, updateStoreProductState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateStoreProductState, dispatch]);

  useEffect(() => {
    switch (getAdminSettingStoresState.status) {
      case GetAdminSettingStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminSettingStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingStoresState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingStoresState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminSettingStoresState, dispatch]);

  useEffect(() => {
    switch (updateAdminSettingStoreOperatingHoursState.status) {
      case UpdateAdminSettingStoreOperatingHoursState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateAdminSettingStoreOperatingHoursState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminSettingStoreOperatingHoursState.success:
        showAlert(
          setSuccessAlert,
          updateAdminSettingStoreOperatingHoursState.message
        );
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminSettingStoreOperatingHoursState.fail:
        showAlert(
          setFailsAlert,
          updateAdminSettingStoreOperatingHoursState.message
        );
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateAdminSettingStoreOperatingHoursState, dispatch]);

  useEffect(() => {
    switch (getAdminStoreState.status) {
      case GetAdminStoreState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminStoreState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminStoreState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminStoreState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminStoreState, dispatch]);

  useEffect(() => {
    switch (adminDeclineRedeemState.status) {
      case AdminDeclineRedeemState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AdminDeclineRedeemState.initial:
        setOpenBackdropLoading(false);
        break;
      case AdminDeclineRedeemState.success:
        showAlert(setSuccessAlert, adminDeclineRedeemState.message);
        setOpenBackdropLoading(false);
        break;
      case AdminDeclineRedeemState.fail:
        showAlert(setFailsAlert, adminDeclineRedeemState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [adminDeclineRedeemState, dispatch]);

  useEffect(() => {
    switch (updateAdminSettingStoreState.status) {
      case UpdateAdminSettingStoreState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateAdminSettingStoreState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminSettingStoreState.success:
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminSettingStoreState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateAdminSettingStoreState, dispatch]);

  useEffect(() => {
    switch (updateStoreDealState.status) {
      case UpdateStoreDealState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateStoreDealState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreDealState.success:
        showAlert(setSuccessAlert, updateStoreDealState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreDealState.fail:
        showAlert(setFailsAlert, updateStoreDealState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateStoreDealState, dispatch]);

  useEffect(() => {
    switch (adminCateringBookingUpdateStatusState.status) {
      case AdminCateringBookingUpdateStatusState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AdminCateringBookingUpdateStatusState.initial:
        setOpenBackdropLoading(false);
        break;
      case AdminCateringBookingUpdateStatusState.success:
        showAlert(
          setSuccessAlert,
          adminCateringBookingUpdateStatusState.message
        );
        setOpenBackdropLoading(false);
        break;
      case AdminCateringBookingUpdateStatusState.fail:
        showAlert(setFailsAlert, adminCateringBookingUpdateStatusState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [adminCateringBookingUpdateStatusState, dispatch]);

  useEffect(() => {
    switch (adminPrivilegeState.status) {
      case AdminPrivilegeState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AdminPrivilegeState.initial:
        setOpenBackdropLoading(false);
        break;
      case AdminPrivilegeState.success:
        showAlert(setSuccessAlert, adminPrivilegeState.message);
        setOpenBackdropLoading(false);
        break;
      case AdminPrivilegeState.fail:
        showAlert(setFailsAlert, adminPrivilegeState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [adminPrivilegeState, dispatch]);

  useEffect(() => {
    switch (adminShopOrderUpdateStatusState.status) {
      case AdminShopOrderUpdateStatusState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AdminShopOrderUpdateStatusState.initial:
        setOpenBackdropLoading(false);
        break;
      case AdminShopOrderUpdateStatusState.success:
        showAlert(setSuccessAlert, adminShopOrderUpdateStatusState.message);
        setOpenBackdropLoading(false);
        break;
      case AdminShopOrderUpdateStatusState.fail:
        showAlert(setFailsAlert, adminShopOrderUpdateStatusState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [adminShopOrderUpdateStatusState, dispatch]);

  useEffect(() => {
    switch (validateReferenceNumberAdminState.status) {
      case ValidateReferenceNumberAdminState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ValidateReferenceNumberAdminState.initial:
        setOpenBackdropLoading(false);
        break;
      case ValidateReferenceNumberAdminState.success:
        showAlert(setSuccessAlert, validateReferenceNumberAdminState.message);
        setOpenBackdropLoading(false);
        break;
      case ValidateReferenceNumberAdminState.fail:
        showAlert(setFailsAlert, validateReferenceNumberAdminState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [validateReferenceNumberAdminState, dispatch]);

  useEffect(() => {
    switch (uploadProofOfPaymentAdminState.status) {
      case UploadProofOfPaymentAdminState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UploadProofOfPaymentAdminState.initial:
        setOpenBackdropLoading(false);
        break;
      case UploadProofOfPaymentAdminState.success:
        showAlert(setSuccessAlert, uploadProofOfPaymentAdminState.message);
        setOpenBackdropLoading(false);
        break;
      case UploadProofOfPaymentAdminState.fail:
        showAlert(setFailsAlert, uploadProofOfPaymentAdminState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [uploadProofOfPaymentAdminState, dispatch]);

  useEffect(() => {
    switch (createAdminGroupState.status) {
      case CreateAdminGroupState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CreateAdminGroupState.initial:
        setOpenBackdropLoading(false);
        break;
      case CreateAdminGroupState.success:
        showAlert(setSuccessAlert, createAdminGroupState.message);
        setOpenBackdropLoading(false);
        break;
      case CreateAdminGroupState.fail:
        showAlert(setFailsAlert, createAdminGroupState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [createAdminGroupState, dispatch]);

  useEffect(() => {
    switch (updateAdminUserStores.status) {
      case UpdateAdminUserStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateAdminUserStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminUserStoresState.success:
        showAlert(setSuccessAlert, updateAdminUserStores.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminUserStoresState.fail:
        showAlert(setFailsAlert, updateAdminUserStores.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateAdminUserStores, dispatch]);

  useEffect(() => {
    switch (getAdminStores.status) {
      case GetAdminStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminStoresState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminStoresState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminStores, dispatch]);

  useEffect(() => {
    switch (getAdminUserStores.status) {
      case GetAdminUserStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminUserStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminUserStoresState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminUserStoresState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminUserStores, dispatch]);

  useEffect(() => {
    switch (editAdminUserState.status) {
      case EditAdminUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case EditAdminUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case EditAdminUserState.success:
        showAlert(setSuccessAlert, editAdminUserState.message);
        setOpenBackdropLoading(false);
        break;
      case EditAdminUserState.fail:
        showAlert(setFailsAlert, editAdminUserState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [editAdminUserState, dispatch]);

  useEffect(() => {
    switch (getAdminGroupsState.status) {
      case GetAdminGroupsState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminGroupsState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminGroupsState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminGroupsState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminGroupsState, dispatch]);

  useEffect(() => {
    switch (getAdminUserState.status) {
      case GetAdminUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminUserState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminUserState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminUserState, dispatch]);

  useEffect(() => {
    switch (createAdminUserState.status) {
      case CreateAdminUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CreateAdminUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case CreateAdminUserState.success:
        showAlert(setSuccessAlert, createAdminUserState.message);
        setOpenBackdropLoading(false);
        break;
      case CreateAdminUserState.fail:
        showAlert(setFailsAlert, createAdminUserState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [createAdminUserState, dispatch]);

  useEffect(() => {
    switch (getAdminUsersState.status) {
      case GetAdminUsersState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminUsersState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminUsersState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminUsersState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminUsersState, dispatch]);

  useEffect(() => {
    switch (getAdminPopclubRedeemState.status) {
      case GetAdminPopclubRedeemState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminPopclubRedeemState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminPopclubRedeemState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminPopclubRedeemState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminPopclubRedeemState, dispatch]);

  useEffect(() => {
    switch (getAdminSessionState.status) {
      case GetAdminSessionState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminSessionState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSessionState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSessionState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminSessionState, dispatch]);

  useEffect(() => {
    switch (loginAdminState.status) {
      case LoginAdminState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case LoginAdminState.initial:
        setOpenBackdropLoading(false);
        break;
      case LoginAdminState.success:
        showAlert(setSuccessAlert, loginAdminState.message);
        setOpenBackdropLoading(false);
        break;
      case LoginAdminState.fail:
        showAlert(setFailsAlert, loginAdminState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [loginAdminState, dispatch]);

  useEffect(() => {
    switch (getAdminShopOrderState.status) {
      case GetAdminShopOrderState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminShopOrderState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminShopOrderState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminShopOrderState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminShopOrderState, dispatch]);

  useEffect(() => {
    switch (getAdminShopOrdersState.status) {
      case GetAdminShopOrdersState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminShopOrdersState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminShopOrdersState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminShopOrdersState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminShopOrdersState, dispatch]);

  useEffect(() => {
    switch (getRedeemState.status) {
      case GetRedeemState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetRedeemState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetRedeemState.success:
        setOpenBackdropLoading(false);
        break;
      case GetRedeemState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getRedeemState, dispatch]);

  useEffect(() => {
    switch (getDealProductVariantsState.status) {
      case GetDealProductVariantsState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case GetDealProductVariantsState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetDealProductVariantsState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetDealProductVariantsState.fail:
        setOpenBackdropPopClubLoading(false);
        break;
    }
  }, [getDealProductVariantsState, dispatch]);

  useEffect(() => {
    switch (getDealState.status) {
      case GetDealState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case GetDealState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetDealState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetDealState.fail:
        setOpenBackdropPopClubLoading(false);
        break;
    }
  }, [getDealState, dispatch]);

  useEffect(() => {
    switch (forgotPasswordNewPasswordOTP.status) {
      case ForgotPasswordNewPasswordState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ForgotPasswordNewPasswordState.initial:
        setOpenBackdropLoading(false);
        break;
      case ForgotPasswordNewPasswordState.success:
        showAlert(setSuccessAlert, forgotPasswordNewPasswordOTP.message);
        setOpenBackdropLoading(false);
        break;
      case ForgotPasswordNewPasswordState.fail:
        showAlert(setFailsAlert, forgotPasswordNewPasswordOTP.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [forgotPasswordNewPasswordOTP]);

  useEffect(() => {
    switch (forgotPasswordValidateOTP.status) {
      case ForgotPasswordValidateOTPState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ForgotPasswordValidateOTPState.initial:
        setOpenBackdropLoading(false);
        break;
      case ForgotPasswordValidateOTPState.success:
        showAlert(setSuccessAlert, forgotPasswordValidateOTP.message);
        setOpenBackdropLoading(false);
        break;
      case ForgotPasswordValidateOTPState.fail:
        showAlert(setFailsAlert, forgotPasswordValidateOTP.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [forgotPasswordValidateOTP]);

  useEffect(() => {
    switch (forgotPasswordGenerateOTP.status) {
      case ForgotPasswordGenerateOTPState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ForgotPasswordGenerateOTPState.initial:
        setOpenBackdropLoading(false);
        break;
      case ForgotPasswordGenerateOTPState.success:
        showAlert(setSuccessAlert, forgotPasswordGenerateOTP.message);
        setOpenBackdropLoading(false);
        break;
      case ForgotPasswordGenerateOTPState.fail:
        showAlert(setFailsAlert, forgotPasswordGenerateOTP.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [forgotPasswordGenerateOTP]);

  useEffect(() => {
    switch (signUpMobileUserState.status) {
      case SignUpMobileUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case SignUpMobileUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case SignUpMobileUserState.success:
        showAlert(setSuccessAlert, signUpMobileUserState.message);
        setOpenBackdropLoading(false);
        break;
      case SignUpMobileUserState.fail:
        showAlert(setFailsAlert, signUpMobileUserState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [signUpMobileUserState]);

  useEffect(() => {
    switch (redeemDealState.status) {
      case RedeemDealState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case RedeemDealState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case RedeemDealState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case RedeemDealState.fail:
        setOpenBackdropPopClubLoading(false);
        break;
    }
  }, [redeemDealState]);

  useEffect(() => {
    switch (setStoreAndAddressPopClub.status) {
      case SetStoreAndAddressPopClubState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case SetStoreAndAddressPopClubState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case SetStoreAndAddressPopClubState.success:
        setOpenBackdropPopClubLoading(false);
        dispatch(resetStoreAndAddress());
        break;
      case SetStoreAndAddressPopClubState.fail:
        setOpenBackdropPopClubLoading(false);
        dispatch(resetStoreAndAddress());
        break;
    }
  }, [setStoreAndAddressPopClub, dispatch]);

  useEffect(() => {
    switch (getDealsState.status) {
      case GetDealsState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case GetDealsState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetDealsState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetDealsState.fail:
        setOpenBackdropPopClubLoading(false);
        break;
    }
  }, [getDealsState]);

  useEffect(() => {
    switch (getStoresAvailablePopClubState.status) {
      case GetStoresAvailablePopClubState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetStoresAvailablePopClubState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailablePopClubState.success:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailablePopClubState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getStoresAvailablePopClubState]);

  useEffect(() => {
    switch (signInMobileUserState.status) {
      case SignInMobileUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case SignInMobileUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case SignInMobileUserState.success:
        showAlert(setSuccessAlert, signInMobileUserState.message);
        setOpenBackdropLoading(false);
        break;
      case SignInMobileUserState.fail:
        showAlert(setFailsAlert, signInMobileUserState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [signInMobileUserState]);

  useEffect(() => {
    switch (cateringCheckoutOrdersState.status) {
      case CateringCheckoutOrdersState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CateringCheckoutOrdersState.initial:
        setOpenBackdropLoading(false);
        break;
      case CateringCheckoutOrdersState.success:
        showAlert(setSuccessAlert, cateringCheckoutOrdersState.message);
        setOpenBackdropLoading(false);
        break;
      case CateringCheckoutOrdersState.fail:
        showAlert(setFailsAlert, cateringCheckoutOrdersState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [cateringCheckoutOrdersState]);

  useEffect(() => {
    switch (checkoutOrdersState.status) {
      case CheckoutOrdersState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CheckoutOrdersState.initial:
        setOpenBackdropLoading(false);
        break;
      case CheckoutOrdersState.success:
        showAlert(setSuccessAlert, checkoutOrdersState.message);
        setOpenBackdropLoading(false);
        break;
      case CheckoutOrdersState.fail:
        showAlert(setFailsAlert, checkoutOrdersState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [checkoutOrdersState]);

  useEffect(() => {
    switch (popSnackBarState.status) {
      case PopSnackBarState.success:
        if (popSnackBarState.data.severity === "success")
          showAlert(setSuccessAlert, popSnackBarState.data.message);
        else if (popSnackBarState.data.severity === "error")
          showAlert(setFailsAlert, popSnackBarState.data.message);

        dispatch(popOutSnackBar());
        break;
    }
  }, [popSnackBarState, dispatch]);

  useEffect(() => {
    switch (getStoresAvailableCateringState.status) {
      case GetStoresAvailableCateringState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetStoresAvailableCateringState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableCateringState.success:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableCateringState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getStoresAvailableCateringState, dispatch]);

  useEffect(() => {
    switch (updateContactState.status) {
      case UpdateContactState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateContactState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateContactState.success:
        showAlert(setSuccessAlert, updateContactState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateContactState.fail:
        showAlert(setFailsAlert, updateContactState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateContactState, dispatch]);

  useEffect(() => {
    switch (deleteContactState.status) {
      case DeleteContactState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case DeleteContactState.initial:
        setOpenBackdropLoading(false);
        break;
      case DeleteContactState.success:
        showAlert(setSuccessAlert, deleteContactState.message);
        setOpenBackdropLoading(false);
        break;
      case DeleteContactState.fail:
        showAlert(setFailsAlert, deleteContactState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [deleteContactState, dispatch]);

  useEffect(() => {
    switch (addContactState.status) {
      case AddContactState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AddContactState.initial:
        setOpenBackdropLoading(false);
        break;
      case AddContactState.success:
        showAlert(setSuccessAlert, addContactState.message);
        setOpenBackdropLoading(false);
        break;
      case AddContactState.fail:
        showAlert(setFailsAlert, addContactState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [addContactState, dispatch]);

  useEffect(() => {
    switch (addContactState.status) {
      case AddContactState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AddContactState.initial:
        setOpenBackdropLoading(false);
        break;
      case AddContactState.success:
        showAlert(setSuccessAlert, addContactState.message);
        setOpenBackdropLoading(false);
        break;
      case AddContactState.fail:
        showAlert(setFailsAlert, addContactState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [addContactState, dispatch]);

  useEffect(() => {
    switch (cateringUploadProofOfPaymentState.status) {
      case CateringUploadProofOfPaymentState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CateringUploadProofOfPaymentState.initial:
        setOpenBackdropLoading(false);
        break;
      case CateringUploadProofOfPaymentState.success:
        showAlert(setSuccessAlert, cateringUploadProofOfPaymentState.message);
        setOpenBackdropLoading(false);
        break;
      case CateringUploadProofOfPaymentState.fail:
        showAlert(setFailsAlert, cateringUploadProofOfPaymentState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [cateringUploadProofOfPaymentState, dispatch]);

  useEffect(() => {
    switch (uploadProofOfPaymentState.status) {
      case UploadProofOfPaymentState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UploadProofOfPaymentState.initial:
        setOpenBackdropLoading(false);
        break;
      case UploadProofOfPaymentState.success:
        showAlert(setSuccessAlert, uploadProofOfPaymentState.message);
        setOpenBackdropLoading(false);
        break;
      case UploadProofOfPaymentState.fail:
        showAlert(setFailsAlert, uploadProofOfPaymentState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [uploadProofOfPaymentState, dispatch]);

  useEffect(() => {
    switch (uploadContractState.status) {
      case UploadContractState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UploadContractState.initial:
        setOpenBackdropLoading(false);
        break;
      case UploadContractState.success:
        showAlert(setSuccessAlert, uploadContractState.message);
        setOpenBackdropLoading(false);
        break;
      case UploadContractState.fail:
        showAlert(setFailsAlert, uploadContractState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [uploadContractState, dispatch]);

  useEffect(() => {
    switch (removeItemFromCartShopState.status) {
      case RemoveItemFromCartShopState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case RemoveItemFromCartShopState.initial:
        setOpenBackdropLoading(false);
        break;
      case RemoveItemFromCartShopState.success:
        showAlert(setSuccessAlert, removeItemFromCartShopState.message);
        setOpenBackdropLoading(false);
        break;
      case RemoveItemFromCartShopState.fail:
        showAlert(setFailsAlert, removeItemFromCartShopState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [removeItemFromCartShopState, dispatch]);

  useEffect(() => {
    switch (facebookLoginPointState.status) {
      case FacebookLoginPointState.success:
        setOpenBackdropLoading(false);
        break;
      case FacebookLoginPointState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [facebookLoginPointState, dispatch]);

  useEffect(() => {
    switch (facebookLoginState.status) {
      case FacebookLoginState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case FacebookLoginState.initial:
        setOpenBackdropLoading(false);
        break;
      case FacebookLoginState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [facebookLoginState, dispatch]);

  useEffect(() => {
    switch (setStoreAndAddressState.status) {
      case SetStoreAndAddressState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case SetStoreAndAddressState.initial:
        setOpenBackdropLoading(false);
        break;
      case SetStoreAndAddressState.success:
        setOpenBackdropLoading(false);
        dispatch(resetStoreAndAddress());
        break;
      case SetStoreAndAddressState.fail:
        setOpenBackdropLoading(false);
        dispatch(resetStoreAndAddress());
        break;
    }
  }, [setStoreAndAddressState, dispatch]);

  useEffect(() => {
    switch (getStoresAvailableSnackshopState.status) {
      case GetStoresAvailableSnackshopState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetStoresAvailableSnackshopState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableSnackshopState.success:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableSnackshopState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getStoresAvailableSnackshopState]);

  useEffect(() => {
    switch (getCategoryProductsState.status) {
      case GetCategoryProductsState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetCategoryProductsState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetCategoryProductsState.success:
        setOpenBackdropLoading(false);
        break;
      case GetCategoryProductsState.fail:
        showAlert(setFailsAlert, getCategoryProductsState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [getCategoryProductsState]);

  useEffect(() => {
    switch (getProductDetailsState.status) {
      case GetProductDetailsState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetProductDetailsState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetProductDetailsState.success:
        setOpenBackdropLoading(false);
        break;
      case GetProductDetailsState.fail:
        showAlert(setFailsAlert, getProductDetailsState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [getProductDetailsState]);

  useEffect(() => {
    switch (addToCartShopState.status) {
      case AddToCartShopState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AddToCartShopState.initial:
        setOpenBackdropLoading(false);
        break;
      case AddToCartShopState.success:
        showAlert(setSuccessAlert, addToCartShopState.message);
        setOpenBackdropLoading(false);
        break;
      case AddToCartShopState.fail:
        showAlert(setFailsAlert, addToCartShopState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [addToCartShopState]);

  useEffect(() => {
    switch (addToCartCateringState.status) {
      case AddToCartCateringState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AddToCartCateringState.initial:
        setOpenBackdropLoading(false);
        break;
      case AddToCartCateringState.success:
        showAlert(setSuccessAlert, addToCartCateringState.message);
        setOpenBackdropLoading(false);
        break;
      case AddToCartCateringState.fail:
        showAlert(setFailsAlert, addToCartCateringState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [addToCartCateringState]);

  useEffect(() => {
    switch (editCartProduct.status) {
      case EditCartItemState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case EditCartItemState.initial:
        setOpenBackdropLoading(false);
        break;
      case EditCartItemState.success:
        showAlert(setSuccessAlert, editCartProduct.message);
        setOpenBackdropLoading(false);
        break;
      case EditCartItemState.fail:
        showAlert(setFailsAlert, editCartProduct.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [editCartProduct]);

  return (
    <>
      <Outlet />
      <SnackbarAlert
        open={successAlert.status}
        severity="success"
        message={successAlert.message}
      />
      <SnackbarAlert
        open={failsAlert.status}
        severity="error"
        message={failsAlert.message}
      />
      <BackdropLoading open={openBackdropLoading} />
      <BackdropLoadingPopClub open={openBackdropPopClubLoading} />
    </>
  );
}

function showAlert(
  toggleStateAction: Dispatch<
    SetStateAction<{ status: boolean; message?: string | undefined }>
  >,
  message: string
) {
  toggleStateAction({
    status: true,
    message: message,
  });

  setTimeout(() => {
    toggleStateAction({
      status: false,
      message: message,
    });
  }, 3000);
}
