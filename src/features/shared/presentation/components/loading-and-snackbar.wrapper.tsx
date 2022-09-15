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
  selectUploadContract,
  UploadContractState,
} from "features/catering/presentation/slices/upload-contract.slice";
import {
  CateringUploadProofOfPaymentState,
  selectCateringUploadProofOfPayment,
} from "features/catering/presentation/slices/catering-upload-proof-of-payment.slice";
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
  const editCartProduct = useAppSelector(selectEditCartItem);
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

  useEffect(() => {
    switch (getRedeemState.status) {
      case GetRedeemState.inProgress:
        setOpenBackdropPopClubLoading(true);
        break;
      case GetRedeemState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetRedeemState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetRedeemState.fail:
        setOpenBackdropPopClubLoading(false);
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
        setOpenBackdropPopClubLoading(true);
        break;
      case GetStoresAvailablePopClubState.initial:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetStoresAvailablePopClubState.success:
        setOpenBackdropPopClubLoading(false);
        break;
      case GetStoresAvailablePopClubState.fail:
        setOpenBackdropPopClubLoading(false);
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
        showAlert(setSuccessAlert, getStoresAvailableCateringState.message);
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableCateringState.fail:
        showAlert(setFailsAlert, getStoresAvailableCateringState.message);
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
        showAlert(setSuccessAlert, getStoresAvailableSnackshopState.message);
        setOpenBackdropLoading(false);
        break;
      case GetStoresAvailableSnackshopState.fail:
        showAlert(setFailsAlert, getStoresAvailableSnackshopState.message);
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
    <div>
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
    </div>
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
