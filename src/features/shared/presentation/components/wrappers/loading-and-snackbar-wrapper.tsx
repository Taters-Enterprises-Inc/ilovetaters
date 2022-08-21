import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GetStoresAvailableState, selectGetStoresAvailable } from "../../slices/get-stores-available-slice";
import BackdropLoading from "../loading/backdrop-loading-wrapper";
import MuiAlert from '@mui/material/Alert';

export function LoadingAndSnackbarWrapper(){
    const [openBackdropLoading, setOpenBackdropLoading] = useState(true);
    const [successAlert, setSuccessAlert] = useState<{status: boolean, message?: string}>({
      status: false,
    });
  
    const [failsAlert, setFailsAlert] = useState<{status: boolean, message?: string}>({
      status: false,
    });
    
    const getStoresAvailableState = useAppSelector(selectGetStoresAvailable);
    const dispatch = useAppDispatch();
    
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
    },[getStoresAvailableState, dispatch]);

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
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical : 'top', horizontal : 'center'}} TransitionComponent={Slide}>
          <MuiAlert severity={severity}>
            {message}
          </MuiAlert>
        </Snackbar>
    )
  }