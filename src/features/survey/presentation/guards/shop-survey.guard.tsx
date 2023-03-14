import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  selectGetCustomerSurveyResponseInOrderService,
  getCustomerSurveyResponseInOrderService,
  GetCustomerSurveyResponseInOrderServiceState,
} from "features/shared/presentation/slices/get-customer-survey-response-in-order-service.slice";

export function ShopSurveyGuard() {
  const dispatch = useAppDispatch();
  const { hash } = useParams();

  const getCustomerSurveyResponseInOrderServiceState = useAppSelector(
    selectGetCustomerSurveyResponseInOrderService
  );

  useEffect(() => {
    if (hash) {
      dispatch(
        getCustomerSurveyResponseInOrderService({
          hash,
          service: "snackshop",
        })
      );
    }
  }, [hash, dispatch]);

  if (
    getCustomerSurveyResponseInOrderServiceState.status ===
      GetCustomerSurveyResponseInOrderServiceState.success &&
    getCustomerSurveyResponseInOrderServiceState.data
  ) {
    return (
      <Navigate
        to={
          "/feedback/complete/" +
          getCustomerSurveyResponseInOrderServiceState.data.hash
        }
      />
    );
  }

  return <Outlet />;
}
