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
import { selectEditCartItem   ,EditCartItemState} from "features/shop/presentation/slices/edit-cart-item.slice";

export function LoadingAndSnackbarWrapper() {
  const [openBackdropLoading, setOpenBackdropLoading] = useState(true);
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
        dispatch(resetStoreAndAddress());
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
      case EditCartItemState  .inProgress:
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
