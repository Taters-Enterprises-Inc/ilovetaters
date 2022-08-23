import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GetStoresAvailableState, selectGetStoresAvailable } from "../../slices/get-stores-available-slice";
import BackdropLoading from "../loading/backdrop-loading-wrapper";
import MuiAlert from '@mui/material/Alert';
import { GetCategoryProductsState, selectGetCategoryProducts } from "features/shop/presentation/slices/get-category-products.slice";
import { GetProductDetailsState, selectGetProductDetails } from "features/shop/presentation/slices/get-product-details.slice";
import { AddToCartState, selectAddToCart } from "features/shop/presentation/slices/add-to-cart.slice";
import { resetStoreAndAddress, selectSetStoreAndAddress, SetStoreAndAddressState } from "../../slices/set-store-and-address.slice";
import { FacebookLoginState, selectFacebookLogin } from "../../slices/facebook-login.slice";
import { FacebookLoginPointState, selectFacebookLoginPoint } from "../../slices/facebook-login-point.slice";

export function LoadingAndSnackbarWrapper(){
    const [openBackdropLoading, setOpenBackdropLoading] = useState(true);
    const [successAlert, setSuccessAlert] = useState<{status: boolean, message?: string}>({
      status: false,
    });
  
    const [failsAlert, setFailsAlert] = useState<{status: boolean, message?: string}>({
      status: false,
    });
    
    const dispatch = useAppDispatch();

    const getStoresAvailableState = useAppSelector(selectGetStoresAvailable);
    const getCategoryProductsState = useAppSelector(selectGetCategoryProducts);
    const getProductDetailsState = useAppSelector(selectGetProductDetails);
    const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);
    const addToCartState = useAppSelector(selectAddToCart);
    const facebookLoginState = useAppSelector(selectFacebookLogin);
    const facebookLoginPointState = useAppSelector(selectFacebookLoginPoint);
    
    useEffect(()=>{
        switch(facebookLoginPointState.status){
            case FacebookLoginPointState.success:
                setOpenBackdropLoading(false);
                break;
            case FacebookLoginPointState.fail:
                setOpenBackdropLoading(false);
                dispatch(resetStoreAndAddress());
                break;
        }
    },[facebookLoginState, dispatch]);
    useEffect(()=>{
        switch(facebookLoginState.status){
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
    },[facebookLoginState, dispatch]);

    useEffect(()=>{
        switch(setStoreAndAddressState.status){
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
    },[setStoreAndAddressState, dispatch]);

    useEffect(()=>{
        switch(getStoresAvailableState.status){
            case GetStoresAvailableState.inProgress:
                setOpenBackdropLoading(true);
                break;
            case GetStoresAvailableState.initial:
                setOpenBackdropLoading(false);
                break;
            case GetStoresAvailableState.success:
                showAlert(setSuccessAlert,getStoresAvailableState.message);
                setOpenBackdropLoading(false);
                break;
            case GetStoresAvailableState.fail:
                showAlert(setFailsAlert,getStoresAvailableState.message);
                setOpenBackdropLoading(false);
                break;
        }
    },[getStoresAvailableState]);

    useEffect(()=>{
        switch(getCategoryProductsState.status){
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
                showAlert(setFailsAlert,getCategoryProductsState.message);
                setOpenBackdropLoading(false);
                break;
        }
    },[getCategoryProductsState]);
    
    useEffect(()=>{
      switch(getProductDetailsState.status){
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
              showAlert(setFailsAlert,getProductDetailsState.message);
              setOpenBackdropLoading(false);
              break;
      }
  },[getProductDetailsState]);

    useEffect(()=>{
      switch(addToCartState.status){
          case AddToCartState.inProgress:
              setOpenBackdropLoading(true);
              break;
          case AddToCartState.initial:
              setOpenBackdropLoading(false);
              break;
          case AddToCartState.success:
              showAlert(setSuccessAlert,addToCartState.message);
              setOpenBackdropLoading(false);
              break;
          case AddToCartState.fail:
              showAlert(setFailsAlert,addToCartState.message);
              setOpenBackdropLoading(false);
              break;
      }
  },[addToCartState]);
  
  return(
      <div>
          <Outlet/>
          <SnackbarAlert open={successAlert.status} severity="success" message={successAlert.message} />
          <SnackbarAlert open={failsAlert.status} severity="error" message={failsAlert.message} />
          <BackdropLoading open={openBackdropLoading}/>
      </div>
  )
}


function showAlert(
    toggleStateAction : Dispatch<SetStateAction<{ status: boolean; message?: string | undefined; }>>, 
    message: string
  ){
    toggleStateAction({
      status: true,
      message: message,
    });
  
    setTimeout(()=>{
      toggleStateAction({
        status: false,
        message: message,
      });
    },3000);
  }
  
  function SnackbarAlert(props: any){
  
    const { open, severity, message } = props;
    
    return(
        <Snackbar open={open} autoHideDuration={10000} anchorOrigin={{ vertical : 'bottom', horizontal : 'center'}} TransitionComponent={Slide}>
          <MuiAlert severity={severity}>
            {message}
          </MuiAlert>
        </Snackbar>
    )
  }