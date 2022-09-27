import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  adminShopOrderUpdateStatus,
  selectAdminShopOrderUpdateStatus,
} from "../slices/admin-shop-order-update-status.slice";
import {
  getAdminShopOrder,
  selectGetAdminShopOrder,
} from "../slices/get-admin-shop-order.slice";
import { useEffect } from "react";

export function AdminShopOrderCustomerInformationButtons() {
  const getAdminShopOrderState = useAppSelector(selectGetAdminShopOrder);
  const adminShopOrderUpdateStatusState = useAppSelector(
    selectAdminShopOrderUpdateStatus
  );
  const query = useQuery();
  const dispatch = useAppDispatch();
  const trackingNo = query.get("tracking_no");

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminShopOrder(trackingNo));
    }
  }, [dispatch, trackingNo, adminShopOrderUpdateStatusState]);

  const handleUpdateStatus = (status: string) => {
    if (getAdminShopOrderState.data) {
      const formData = new FormData();
      formData.append("trans_id", getAdminShopOrderState.data.id.toString());
      formData.append("status", status);
      dispatch(adminShopOrderUpdateStatus(formData));
    }
  };

  if (getAdminShopOrderState.data) {
    if (
      (getAdminShopOrderState.data.status === 2 &&
        getAdminShopOrderState.data.payment_proof !== "" &&
        getAdminShopOrderState.data.reference_num !== "") ||
      (getAdminShopOrderState.data.status === 1 &&
        getAdminShopOrderState.data.payops === 3) ||
      getAdminShopOrderState.data.status === 7
    ) {
      return (
        <>
          <button
            onClick={() => {
              handleUpdateStatus("7");
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Reject
          </button>
          <button
            onClick={() => {
              handleUpdateStatus("4");
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline
          </button>
          <button
            onClick={() => {
              handleUpdateStatus("3");
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Confirm
          </button>
        </>
      );
    } else if (
      (getAdminShopOrderState.data.status === 1 &&
        getAdminShopOrderState.data.payment_proof === "") ||
      (getAdminShopOrderState.data.status === 2 &&
        getAdminShopOrderState.data.payment_proof !== "" &&
        getAdminShopOrderState.data.reference_num === "")
    ) {
      return (
        <>
          <button
            onClick={() => {
              handleUpdateStatus("7");
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Reject
          </button>
          <button
            onClick={() => {
              handleUpdateStatus("4");
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline
          </button>
          <button
            disabled
            style={{ opacity: 0.65 }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md cursor-not-allowed lg:mb-0"
          >
            Confirm
          </button>
        </>
      );
    } else if (
      (getAdminShopOrderState.data.status === 3 &&
        getAdminShopOrderState.data.payment_proof === "" &&
        getAdminShopOrderState.data.payops === 3) ||
      (getAdminShopOrderState.data.status === 3 &&
        getAdminShopOrderState.data.payment_proof !== "" &&
        getAdminShopOrderState.data.payops !== 3)
    ) {
      return (
        <button
          onClick={() => {
            handleUpdateStatus("8");
          }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
        >
          Prepare
        </button>
      );
    } else if (
      (getAdminShopOrderState.data.status === 8 &&
        getAdminShopOrderState.data.payment_proof === "" &&
        getAdminShopOrderState.data.payops === 3) ||
      (getAdminShopOrderState.data.status === 8 &&
        getAdminShopOrderState.data.payment_proof !== "" &&
        getAdminShopOrderState.data.payops !== 3)
    ) {
      return (
        <button
          onClick={() => {
            handleUpdateStatus("9");
          }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
        >
          Dispatch
        </button>
      );
    } else if (
      (getAdminShopOrderState.data.status === 9 &&
        getAdminShopOrderState.data.payment_proof === "" &&
        getAdminShopOrderState.data.payops === 3) ||
      (getAdminShopOrderState.data.status === 9 &&
        getAdminShopOrderState.data.payment_proof !== "" &&
        getAdminShopOrderState.data.payops !== 3)
    ) {
      return (
        <button
          onClick={() => {
            handleUpdateStatus("6");
          }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
        >
          Complete
        </button>
      );
    }
  }

  return null;
}
