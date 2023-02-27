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
import { BackdropLoading } from "./backdrop-loading.wrapper";
import {
  GetStoresAvailableCateringState,
  selectGetStoresAvailableCatering,
} from "features/catering/presentation/slices/get-stores-available-catering.slice";
import {
  AddToCartShopState,
  selectAddToCartShop,
} from "features/shop/presentation/slices/add-to-cart-shop.slice";
import { SnackbarAlert } from "../components/snackbar-alert";
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
  GetSnacksDeliveredAvailableStoresState,
  selectGetSnacksDeliveredAvailableStores,
} from "features/popclub/presentation/slices/get-snacks-delivered-available-stores.slice";
import {
  GetDealsState,
  selectGetDeals,
} from "features/popclub/presentation/slices/get-deals.slice";
import {
  selectSetSnacksDeliveredStoreAndAddress,
  SetSnacksDeliveredStoreAndAddressState,
} from "features/popclub/presentation/slices/set-snacks-delivered-store-and-address.slice";
import {
  RedeemDealState,
  selectRedeemDeal,
} from "features/popclub/presentation/slices/redeem-deal.slice";
import {
  selectSignUpMobileUser,
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
  GetAdminSettingUserStoreState,
  selectGetAdminSettingUserStore,
} from "features/admin/presentation/slices/get-admin-setting-user-store.slice";
import {
  GetAdminSettingUserStoresState,
  selectGetAdminSettingUserStores,
} from "features/admin/presentation/slices/get-admin-setting-user-stores.slice";
import {
  selectUpdateAdminSettingUserStores,
  UpdateAdminSettingUserStoresState,
} from "features/admin/presentation/slices/update-admin-setting-user-stores.slice";
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
  AdminDeclineRedeemState,
  selectAdminDeclineRedeem,
} from "features/admin/presentation/slices/admin-decline-redeem.slice";
import {
  GetAdminSettingStoresState,
  selectGetAdminSettingStores,
} from "features/admin/presentation/slices/get-admin-setting-stores.slice";
import {
  selectUpdateStoreProduct,
  UpdateStoreProductState,
} from "features/admin/presentation/slices/update-store-product.slice";
import {
  selectUpdateStoreCatersPackage,
  UpdateStoreCatersPackageState,
} from "features/admin/presentation/slices/update-store-caters-packages.slice";
import {
  selectUpdateStoreCatersPackageAddon,
  UpdateStoreCatersPackageAddonState,
} from "features/admin/presentation/slices/update-store-caters-package-addons.slice";
import {
  selectUpdateStoreCatersProductAddon,
  UpdateStoreCatersProductAddonState,
} from "features/admin/presentation/slices/update-store-caters-product-addons.slice";
import {
  AdminCateringPrivilegeState,
  selectAdminCateringPrivilege,
} from "features/admin/presentation/slices/admin-catering-privilege.slice";
import {
  ApplyUserDiscountState,
  selectApplyUserDiscount,
} from "features/profile/presentation/slices/apply-user-discount.slice";
import {
  AdminUserDiscountChangeStatusState,
  selectAdminUserDiscountChangeStatus,
} from "features/admin/presentation/slices/admin-user-discount-change-status.slice";
import {
  selectUpdateUserDiscount,
  UpdateUserDiscountState,
} from "features/profile/presentation/slices/update-user-discount.slice";
import {
  LoginBscState,
  selectLoginBsc,
} from "features/bsc/presentation/slices/login-bsc.slice";
import {
  CreateBscUserState,
  selectCreateBscUser,
} from "features/bsc/presentation/slices/create-bsc-user.slice";
import {
  selectUpdateBscUserStatus,
  UpdateBscUserStatusState,
} from "features/bsc/presentation/slices/update-bsc-user-status.slice";
import {
  selectUpdateBscUser,
  UpdateBscUserState,
} from "features/bsc/presentation/slices/bsc-update-user.slice";
import {
  GetStoresAvailableSnackshopModalState,
  selectGetStoresAvailableSnackshopModal,
} from "features/shop/presentation/slices/get-stores-available-snackshop-modal.slice";
import {
  GetStoresAvailableCateringModalState,
  selectGetStoresAvailableCateringModal,
} from "features/catering/presentation/slices/get-stores-available-catering-modal.slice";
import {
  InsertCustomerSurveyResponseState,
  selectInsertCustomerSurveyResponse,
} from "features/survey/presentation/slices/insert-customer-survey-response.slice";
import {
  CreateAdminSettingShopProductState,
  selectCreateAdminSettingShopProduct,
} from "features/admin/presentation/slices/create-admin-setting-shop-product.slice";
import {
  EditAdminSettingShopProductState,
  selectEditAdminSettingShopProduct,
} from "features/admin/presentation/slices/edit-admin-setting-shop-product.slice";
import {
  DeleteAdminSettingShopProductState,
  selectDeleteAdminSettingShopProduct,
} from "features/admin/presentation/slices/delete-admin-setting-shop-product.slice";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  AddToCartCateringProductsState,
  selectAddToCartCateringProducts,
} from "features/catering/presentation/slices/add-to-cart-catering-products.slice";

import {
  selectUpdateAdminCateringOrderItemRemarks,
  UpdateAdminCateringOrderItemRemarksState,
} from "features/admin/presentation/slices/update-admin-catering-order-item-remarks.slice";
import {
  CreateAdminSettingStoreState,
  selectCreateAdminSettingStore,
} from "features/admin/presentation/slices/create-admin-setting-store.slice";
import {
  GetSnacksDeliveredDealAvailableStoresState,
  selectGetSnacksDeliveredDealAvailableStores,
} from "features/popclub/presentation/slices/get-snacks-delivered-deal-available-stores.slice";
import {
  selectSetSnacksDeliveredDealStoreAndAddress,
  SetSnacksDeliveredDealStoreAndAddressState,
} from "features/popclub/presentation/slices/set-snacks-delivered-deal-store-and-address.slice";
import {
  selectSetSnackshopStoreAndAddress,
  SetSnackshopStoreAndAddressState,
} from "features/shop/presentation/slices/set-snackshop-store-and-address.slice";
import {
  selectSetCateringStoreAndAddress,
  SetCateringStoreAndAddressState,
} from "features/catering/presentation/slices/set-catering-store-and-address.slice";
import {
  GetAdminSettingStoreState,
  selectGetAdminSettingStore,
} from "features/admin/presentation/slices/get-admin-setting-store.slice";
import {
  EditAdminSettingStoreState,
  selectEditAdminSettingStore,
} from "features/admin/presentation/slices/edit-admin-setting-store.slice";

const SweetAlert = withReactContent(Swal);

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
  const setSnackshopStoreAndAddressState = useAppSelector(
    selectSetSnackshopStoreAndAddress
  );
  const setCateringStoreAndAddressState = useAppSelector(
    selectSetCateringStoreAndAddress
  );
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
  const getSnacksDeliveredAvailableStoresState = useAppSelector(
    selectGetSnacksDeliveredAvailableStores
  );
  const getDealsState = useAppSelector(selectGetDeals);
  const setSnacksDeliveredStoreAndAddress = useAppSelector(
    selectSetSnacksDeliveredStoreAndAddress
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
  const getAdminPopclubRedeemState = useAppSelector(
    selectGetAdminPopclubRedeem
  );

  const getAdminUsersState = useAppSelector(selectGetAdminUsers);
  const createAdminUserState = useAppSelector(selectCreateAdminUser);
  const editAdminUserState = useAppSelector(selectEditAdminUser);
  const getAdminUserState = useAppSelector(selectGetAdminUser);
  const getAdminGroupsState = useAppSelector(selectGetAdminGroups);
  const getAdminSettingUserStoreState = useAppSelector(
    selectGetAdminSettingUserStore
  );
  const getAdminSettingUserStoresState = useAppSelector(
    selectGetAdminSettingUserStores
  );
  const updateAdminSettingUserStores = useAppSelector(
    selectUpdateAdminSettingUserStores
  );
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

  const adminDeclineRedeemState = useAppSelector(selectAdminDeclineRedeem);

  const getAdminSettingStoresState = useAppSelector(
    selectGetAdminSettingStores
  );
  const updateStoreProductState = useAppSelector(selectUpdateStoreProduct);
  const updateStoreCatersPackageState = useAppSelector(
    selectUpdateStoreCatersPackage
  );
  const updateStoreCatersPackageAddonState = useAppSelector(
    selectUpdateStoreCatersPackageAddon
  );
  const updateStoreCatersProductAddonState = useAppSelector(
    selectUpdateStoreCatersProductAddon
  );

  const adminCateringPrivilegeState = useAppSelector(
    selectAdminCateringPrivilege
  );

  const applyUserDiscountState = useAppSelector(selectApplyUserDiscount);

  const adminUserDiscountChangeStatusState = useAppSelector(
    selectAdminUserDiscountChangeStatus
  );

  const updateUserDiscountState = useAppSelector(selectUpdateUserDiscount);

  const loginBscState = useAppSelector(selectLoginBsc);

  const createBscUserState = useAppSelector(selectCreateBscUser);

  const updateBscUserStatusState = useAppSelector(selectUpdateBscUserStatus);

  const updateBscUserState = useAppSelector(selectUpdateBscUser);

  const getStoresAvailableSnackshopModalState = useAppSelector(
    selectGetStoresAvailableSnackshopModal
  );
  const getStoresAvailableCateringModalState = useAppSelector(
    selectGetStoresAvailableCateringModal
  );
  const addToCartCateringProductsState = useAppSelector(
    selectAddToCartCateringProducts
  );

  const updateAdminCateringOrderItemRemarksState = useAppSelector(
    selectUpdateAdminCateringOrderItemRemarks
  );
  const createAdminSettingStoreState = useAppSelector(
    selectCreateAdminSettingStore
  );

  const getAdminSettingStoreState = useAppSelector(selectGetAdminSettingStore);
  const editAdminSettingStoreState = useAppSelector(
    selectEditAdminSettingStore
  );

  useEffect(() => {
    switch (editAdminSettingStoreState.status) {
      case EditAdminSettingStoreState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case EditAdminSettingStoreState.initial:
        setOpenBackdropLoading(false);
        break;
      case EditAdminSettingStoreState.success:
        showAlert(setSuccessAlert, editAdminSettingStoreState.message);
        setOpenBackdropLoading(false);
        break;
      case EditAdminSettingStoreState.fail:
        showAlert(setFailsAlert, editAdminSettingStoreState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [editAdminSettingStoreState]);

  useEffect(() => {
    switch (getAdminSettingStoreState.status) {
      case GetAdminSettingStoreState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminSettingStoreState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingStoreState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingStoreState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminSettingStoreState]);

  useEffect(() => {
    switch (createAdminSettingStoreState.status) {
      case CreateAdminSettingStoreState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CreateAdminSettingStoreState.initial:
        setOpenBackdropLoading(false);
        break;
      case CreateAdminSettingStoreState.success:
        showAlert(setSuccessAlert, createAdminSettingStoreState.message);
        setOpenBackdropLoading(false);
        break;
      case CreateAdminSettingStoreState.fail:
        showAlert(setFailsAlert, createAdminSettingStoreState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [createAdminSettingStoreState]);

  const getSnacksDeliveredDealAvailableStoresState = useAppSelector(
    selectGetSnacksDeliveredDealAvailableStores
  );

  const setSnacksDeliveredDealStoreAndAddressState = useAppSelector(
    selectSetSnacksDeliveredDealStoreAndAddress
  );

  useEffect(() => {
    switch (setCateringStoreAndAddressState.status) {
      case SetCateringStoreAndAddressState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case SetCateringStoreAndAddressState.initial:
        setOpenBackdropLoading(false);
        break;
      case SetCateringStoreAndAddressState.success:
        setOpenBackdropLoading(false);
        break;
      case SetCateringStoreAndAddressState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [setCateringStoreAndAddressState, dispatch]);

  useEffect(() => {
    switch (setSnackshopStoreAndAddressState.status) {
      case SetSnackshopStoreAndAddressState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case SetSnackshopStoreAndAddressState.initial:
        setOpenBackdropLoading(false);
        break;
      case SetSnackshopStoreAndAddressState.success:
        setOpenBackdropLoading(false);
        break;
      case SetSnackshopStoreAndAddressState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [setSnackshopStoreAndAddressState, dispatch]);

  useEffect(() => {
    switch (setSnacksDeliveredDealStoreAndAddressState.status) {
      case SetSnacksDeliveredDealStoreAndAddressState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case SetSnacksDeliveredDealStoreAndAddressState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case SetSnacksDeliveredDealStoreAndAddressState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case SetSnacksDeliveredDealStoreAndAddressState.fail:
        setOpenBackdropPopClubLoading(false);
        break;
    }
  }, [setSnacksDeliveredDealStoreAndAddressState, dispatch]);

  useEffect(() => {
    switch (getSnacksDeliveredDealAvailableStoresState.status) {
      case GetSnacksDeliveredDealAvailableStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetSnacksDeliveredDealAvailableStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetSnacksDeliveredDealAvailableStoresState.success:
        setOpenBackdropLoading(false);
        break;
      case GetSnacksDeliveredDealAvailableStoresState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getSnacksDeliveredDealAvailableStoresState]);

  useEffect(() => {
    switch (addToCartCateringProductsState.status) {
      case AddToCartCateringProductsState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AddToCartCateringProductsState.initial:
        setOpenBackdropLoading(false);
        break;
      case AddToCartCateringProductsState.success:
        SweetAlert.fire(
          "Package Created!",
          addToCartCateringProductsState.message,
          "success"
        );
        setOpenBackdropLoading(false);
        break;
      case AddToCartCateringProductsState.fail:
        SweetAlert.fire(
          "Oops...",
          addToCartCateringProductsState.message,
          "error"
        );
        setOpenBackdropLoading(false);
        break;
    }
  }, [addToCartCateringProductsState]);

  useEffect(() => {
    switch (updateAdminCateringOrderItemRemarksState.status) {
      case UpdateAdminCateringOrderItemRemarksState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateAdminCateringOrderItemRemarksState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminCateringOrderItemRemarksState.success:
        showAlert(
          setSuccessAlert,
          updateAdminCateringOrderItemRemarksState.message
        );
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminCateringOrderItemRemarksState.fail:
        showAlert(
          setFailsAlert,
          updateAdminCateringOrderItemRemarksState.message
        );
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateAdminCateringOrderItemRemarksState]);

  const insertCustomerSurveyResponseState = useAppSelector(
    selectInsertCustomerSurveyResponse
  );

  const createAdminSettingShopProductState = useAppSelector(
    selectCreateAdminSettingShopProduct
  );

  const editAdminSettingShopProductState = useAppSelector(
    selectEditAdminSettingShopProduct
  );

  const deleteAdminSettingShopProductState = useAppSelector(
    selectDeleteAdminSettingShopProduct
  );

  useEffect(() => {
    switch (deleteAdminSettingShopProductState.status) {
      case DeleteAdminSettingShopProductState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case DeleteAdminSettingShopProductState.initial:
        setOpenBackdropLoading(false);
        break;
      case DeleteAdminSettingShopProductState.success:
        showAlert(setSuccessAlert, deleteAdminSettingShopProductState.message);
        setOpenBackdropLoading(false);
        break;
      case DeleteAdminSettingShopProductState.fail:
        showAlert(setFailsAlert, deleteAdminSettingShopProductState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [deleteAdminSettingShopProductState]);

  useEffect(() => {
    switch (editAdminSettingShopProductState.status) {
      case EditAdminSettingShopProductState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case EditAdminSettingShopProductState.initial:
        setOpenBackdropLoading(false);
        break;
      case EditAdminSettingShopProductState.success:
        showAlert(setSuccessAlert, editAdminSettingShopProductState.message);
        setOpenBackdropLoading(false);
        break;
      case EditAdminSettingShopProductState.fail:
        showAlert(setFailsAlert, editAdminSettingShopProductState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [editAdminSettingShopProductState]);

  useEffect(() => {
    switch (createAdminSettingShopProductState.status) {
      case CreateAdminSettingShopProductState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CreateAdminSettingShopProductState.initial:
        setOpenBackdropLoading(false);
        break;
      case CreateAdminSettingShopProductState.success:
        showAlert(setSuccessAlert, createAdminSettingShopProductState.message);
        setOpenBackdropLoading(false);
        break;
      case CreateAdminSettingShopProductState.fail:
        showAlert(setFailsAlert, createAdminSettingShopProductState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [createAdminSettingShopProductState]);

  useEffect(() => {
    switch (insertCustomerSurveyResponseState.status) {
      case InsertCustomerSurveyResponseState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case InsertCustomerSurveyResponseState.initial:
        setOpenBackdropLoading(false);
        break;
      case InsertCustomerSurveyResponseState.success:
        showAlert(setSuccessAlert, insertCustomerSurveyResponseState.message);
        setOpenBackdropLoading(false);
        break;
      case InsertCustomerSurveyResponseState.fail:
        showAlert(setFailsAlert, insertCustomerSurveyResponseState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [insertCustomerSurveyResponseState]);

  useEffect(() => {
    switch (updateBscUserState.status) {
      case UpdateBscUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateBscUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateBscUserState.success:
        showAlert(setSuccessAlert, updateBscUserState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateBscUserState.fail:
        showAlert(setFailsAlert, updateBscUserState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateBscUserState]);

  useEffect(() => {
    switch (updateBscUserStatusState.status) {
      case UpdateBscUserStatusState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateBscUserStatusState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateBscUserStatusState.success:
        showAlert(setSuccessAlert, updateBscUserStatusState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateBscUserStatusState.fail:
        showAlert(setFailsAlert, updateBscUserStatusState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateBscUserStatusState]);

  useEffect(() => {
    switch (createBscUserState.status) {
      case CreateBscUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case CreateBscUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case CreateBscUserState.success:
        showAlert(setSuccessAlert, createBscUserState.message);
        setOpenBackdropLoading(false);
        break;
      case CreateBscUserState.fail:
        showAlert(setFailsAlert, createBscUserState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [createBscUserState]);

  useEffect(() => {
    switch (loginBscState.status) {
      case LoginBscState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case LoginBscState.initial:
        setOpenBackdropLoading(false);
        break;
      case LoginBscState.success:
        showAlert(setSuccessAlert, loginBscState.message);
        setOpenBackdropLoading(false);
        break;
      case LoginBscState.fail:
        showAlert(setFailsAlert, loginBscState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [loginBscState]);

  useEffect(() => {
    switch (updateUserDiscountState.status) {
      case UpdateUserDiscountState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateUserDiscountState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateUserDiscountState.success:
        showAlert(setSuccessAlert, updateUserDiscountState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateUserDiscountState.fail:
        showAlert(setFailsAlert, updateUserDiscountState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateUserDiscountState]);

  useEffect(() => {
    switch (adminUserDiscountChangeStatusState.status) {
      case AdminUserDiscountChangeStatusState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AdminUserDiscountChangeStatusState.initial:
        setOpenBackdropLoading(false);
        break;
      case AdminUserDiscountChangeStatusState.success:
        showAlert(setSuccessAlert, adminUserDiscountChangeStatusState.message);
        setOpenBackdropLoading(false);
        break;
      case AdminUserDiscountChangeStatusState.fail:
        showAlert(setFailsAlert, adminUserDiscountChangeStatusState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [adminUserDiscountChangeStatusState]);

  useEffect(() => {
    switch (applyUserDiscountState.status) {
      case ApplyUserDiscountState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ApplyUserDiscountState.initial:
        setOpenBackdropLoading(false);
        break;
      case ApplyUserDiscountState.success:
        showAlert(setSuccessAlert, applyUserDiscountState.message);
        setOpenBackdropLoading(false);
        break;
      case ApplyUserDiscountState.fail:
        showAlert(setFailsAlert, applyUserDiscountState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [applyUserDiscountState]);

  useEffect(() => {
    switch (applyUserDiscountState.status) {
      case ApplyUserDiscountState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ApplyUserDiscountState.initial:
        setOpenBackdropLoading(false);
        break;
      case ApplyUserDiscountState.success:
        showAlert(setSuccessAlert, applyUserDiscountState.message);
        setOpenBackdropLoading(false);
        break;
      case ApplyUserDiscountState.fail:
        showAlert(setFailsAlert, applyUserDiscountState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [applyUserDiscountState]);

  useEffect(() => {
    switch (getStoresAvailableCateringModalState.status) {
      case GetStoresAvailableCateringModalState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetStoresAvailableCateringModalState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableCateringModalState.success:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableCateringModalState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getStoresAvailableCateringModalState]);

  useEffect(() => {
    switch (getStoresAvailableSnackshopModalState.status) {
      case GetStoresAvailableSnackshopModalState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetStoresAvailableSnackshopModalState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableSnackshopModalState.success:
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableSnackshopModalState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getStoresAvailableSnackshopModalState]);

  useEffect(() => {
    switch (adminCateringPrivilegeState.status) {
      case AdminCateringPrivilegeState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AdminCateringPrivilegeState.initial:
        setOpenBackdropLoading(false);
        break;
      case AdminCateringPrivilegeState.success:
        showAlert(setSuccessAlert, adminCateringPrivilegeState.message);
        setOpenBackdropLoading(false);
        break;
      case AdminCateringPrivilegeState.fail:
        showAlert(setFailsAlert, adminCateringPrivilegeState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [adminCateringPrivilegeState]);

  useEffect(() => {
    switch (updateStoreCatersProductAddonState.status) {
      case UpdateStoreCatersProductAddonState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateStoreCatersProductAddonState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreCatersProductAddonState.success:
        showAlert(setSuccessAlert, updateStoreCatersProductAddonState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreCatersProductAddonState.fail:
        showAlert(setFailsAlert, updateStoreCatersProductAddonState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateStoreCatersProductAddonState]);

  useEffect(() => {
    switch (updateStoreCatersPackageAddonState.status) {
      case UpdateStoreCatersPackageAddonState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateStoreCatersPackageAddonState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreCatersPackageAddonState.success:
        showAlert(setSuccessAlert, updateStoreCatersPackageAddonState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreCatersPackageAddonState.fail:
        showAlert(setFailsAlert, updateStoreCatersPackageAddonState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateStoreCatersPackageAddonState]);

  useEffect(() => {
    switch (updateStoreCatersPackageState.status) {
      case UpdateStoreCatersPackageState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateStoreCatersPackageState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreCatersPackageState.success:
        showAlert(setSuccessAlert, updateStoreCatersPackageState.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateStoreCatersPackageState.fail:
        showAlert(setFailsAlert, updateStoreCatersPackageState.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateStoreCatersPackageState]);

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
  }, [updateStoreProductState]);

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
  }, [getAdminSettingStoresState]);

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
  }, [adminDeclineRedeemState]);

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
  }, [updateStoreDealState]);

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
  }, [adminCateringBookingUpdateStatusState]);

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
  }, [adminPrivilegeState]);

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
  }, [adminShopOrderUpdateStatusState]);

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
  }, [validateReferenceNumberAdminState]);

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
  }, [uploadProofOfPaymentAdminState]);

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
  }, [createAdminGroupState]);

  useEffect(() => {
    switch (updateAdminSettingUserStores.status) {
      case UpdateAdminSettingUserStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateAdminSettingUserStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminSettingUserStoresState.success:
        showAlert(setSuccessAlert, updateAdminSettingUserStores.message);
        setOpenBackdropLoading(false);
        break;
      case UpdateAdminSettingUserStoresState.fail:
        showAlert(setFailsAlert, updateAdminSettingUserStores.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateAdminSettingUserStores]);

  useEffect(() => {
    switch (getAdminSettingUserStoresState.status) {
      case GetAdminSettingUserStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminSettingUserStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingUserStoresState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingUserStoresState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminSettingUserStoresState]);

  useEffect(() => {
    switch (getAdminSettingUserStoreState.status) {
      case GetAdminSettingUserStoreState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetAdminSettingUserStoreState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingUserStoreState.success:
        setOpenBackdropLoading(false);
        break;
      case GetAdminSettingUserStoreState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getAdminSettingUserStoreState]);

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
  }, [editAdminUserState]);

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
  }, [getAdminGroupsState]);

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
  }, [getAdminUserState]);

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
  }, [createAdminUserState]);

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
  }, [getAdminUsersState]);

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
  }, [getAdminPopclubRedeemState]);

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
  }, [loginAdminState]);

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
  }, [getAdminShopOrderState]);

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
  }, [getAdminShopOrdersState]);

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
  }, [getRedeemState]);

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
  }, [getDealProductVariantsState]);

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
  }, [getDealState]);

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
        SweetAlert.fire(
          "Account Registered!",
          signUpMobileUserState.message,
          "success"
        );
        setOpenBackdropLoading(false);
        break;
      case SignUpMobileUserState.fail:
        SweetAlert.fire("Oops...", signUpMobileUserState.message, "error");
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
    switch (setSnacksDeliveredStoreAndAddress.status) {
      case SetSnacksDeliveredStoreAndAddressState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case SetSnacksDeliveredStoreAndAddressState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case SetSnacksDeliveredStoreAndAddressState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case SetSnacksDeliveredStoreAndAddressState.fail:
        setOpenBackdropPopClubLoading(false);
        break;
    }
  }, [setSnacksDeliveredStoreAndAddress, dispatch]);

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
    switch (getSnacksDeliveredAvailableStoresState.status) {
      case GetSnacksDeliveredAvailableStoresState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case GetSnacksDeliveredAvailableStoresState.initial:
        setOpenBackdropLoading(false);
        break;
      case GetSnacksDeliveredAvailableStoresState.success:
        setOpenBackdropLoading(false);
        break;
      case GetSnacksDeliveredAvailableStoresState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [getSnacksDeliveredAvailableStoresState]);

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
  }, [popSnackBarState]);

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
  }, [getStoresAvailableCateringState]);

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
  }, [updateContactState]);

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
  }, [deleteContactState]);

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
  }, [addContactState]);

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
  }, [addContactState]);

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
  }, [cateringUploadProofOfPaymentState]);

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
  }, [uploadProofOfPaymentState]);

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
  }, [uploadContractState]);

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
  }, [removeItemFromCartShopState]);

  useEffect(() => {
    switch (facebookLoginPointState.status) {
      case FacebookLoginPointState.success:
        setOpenBackdropLoading(false);
        break;
      case FacebookLoginPointState.fail:
        setOpenBackdropLoading(false);
        break;
    }
  }, [facebookLoginPointState]);

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
  }, [facebookLoginState]);

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
