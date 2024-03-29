import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";

import { useEffect } from "react";
import {
  selectGetAdminCateringBooking,
  getAdminCateringBooking,
} from "../slices/get-admin-catering-booking.slice";
import {
  adminCateringBookingUpdateStatus,
  selectAdminCateringBookingUpdateStatus,
} from "../slices/admin-catering-booking-update-status.slice";
import ReactGA from "react-ga";

export function AdminCateringBookingCustomerInformationButtons() {
  const getAdminCateringBookingState = useAppSelector(
    selectGetAdminCateringBooking
  );
  const adminCateringBookingUpdateStatusState = useAppSelector(
    selectAdminCateringBookingUpdateStatus
  );
  const query = useQuery();
  const dispatch = useAppDispatch();
  const trackingNo = query.get("tracking_no");

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminCateringBooking(trackingNo));
    }
  }, [dispatch, trackingNo, adminCateringBookingUpdateStatusState]);

  const handleUpdateStatus = (status: number) => {
    if (getAdminCateringBookingState.data) {
      dispatch(
        adminCateringBookingUpdateStatus({
          transactionId: getAdminCateringBookingState.data.id,
          fbUserId: getAdminCateringBookingState.data.fb_user_id,
          mobileUserId: getAdminCateringBookingState.data.mobile_user_id,
          transactionHash: getAdminCateringBookingState.data.hash_key,
          status,
        })
      );
    }
  };

  if (getAdminCateringBookingState.data) {
    if (getAdminCateringBookingState.data.status === 1) {
      return (
        <>
          <button
            onClick={() => {
              handleUpdateStatus(20);
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Booking
          </button>
          <button
            onClick={() => {
              ReactGA.event({
                category: "Admin Catering Order",
                action: "Confirm order",
              });
              handleUpdateStatus(2);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Confirm Booking
          </button>
        </>
      );
    } else if (getAdminCateringBookingState.data.status === 2) {
      return (
        <button
          disabled
          style={{ opacity: 0.65 }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md cursor-not-allowed lg:mb-0"
        >
          Booking Confirmed
        </button>
      );
    } else if (getAdminCateringBookingState.data.status === 3) {
      return (
        <>
          <button
            onClick={() => {
              handleUpdateStatus(21);
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Contract
          </button>
          <button
            onClick={() => {
              handleUpdateStatus(4);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Verify Contract
          </button>
        </>
      );
    } else if (getAdminCateringBookingState.data.status === 4) {
      return (
        <button
          disabled
          style={{ opacity: 0.65 }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md cursor-not-allowed lg:mb-0"
        >
          Contract Verified
        </button>
      );
    } else if (getAdminCateringBookingState.data.status === 5) {
      return (
        <>
          <button
            onClick={() => {
              handleUpdateStatus(22);
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Initial Payment
          </button>
          <button
            onClick={() => {
              handleUpdateStatus(6);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Verify Initial Payment
          </button>
        </>
      );
    } else if (getAdminCateringBookingState.data.status === 6) {
      return (
        <button
          disabled
          style={{ opacity: 0.65 }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md cursor-not-allowed lg:mb-0"
        >
          Initial Payment Verified
        </button>
      );
    } else if (getAdminCateringBookingState.data.status === 7) {
      return (
        <>
          <button
            onClick={() => {
              handleUpdateStatus(23);
            }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Final Payment
          </button>
          <button
            onClick={() => {
              handleUpdateStatus(8);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Verify Final Payment
          </button>
        </>
      );
    } else if (getAdminCateringBookingState.data.status === 6) {
      return (
        <button
          disabled
          style={{ opacity: 0.65 }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md cursor-not-allowed lg:mb-0"
        >
          Final Payment Verified
        </button>
      );
    } else if (getAdminCateringBookingState.data.status === 8) {
      return (
        <button
          onClick={() => {
            ReactGA.event({
              category: "Admin Catering Order",
              action: "Complete order",
            });
            handleUpdateStatus(9);
          }}
          className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
        >
          Complete
        </button>
      );
    } else if (getAdminCateringBookingState.data.status === 20) {
      return (
        <>
          <button
            disabled
            style={{ opacity: 0.65 }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Booking
          </button>
          <button
            onClick={() => {
              ReactGA.event({
                category: "Admin Catering Order",
                action: "Confirm order",
              });
              handleUpdateStatus(2);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Confirm Booking
          </button>
        </>
      );
    } else if (getAdminCateringBookingState.data.status === 21) {
      return (
        <>
          <button
            disabled
            style={{ opacity: 0.65 }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Contract
          </button>
          <button
            onClick={() => {
              handleUpdateStatus(4);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Verify Contract
          </button>
        </>
      );
    } else if (getAdminCateringBookingState.data.status === 22) {
      return (
        <>
          <button
            disabled
            style={{ opacity: 0.65 }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Initial Payment
          </button>
          <button
            onClick={() => {
              handleUpdateStatus(6);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Verify Initial Payment
          </button>
        </>
      );
    } else if (getAdminCateringBookingState.data.status === 23) {
      return (
        <>
          <button
            disabled
            style={{ opacity: 0.65 }}
            className="px-3 py-1 mb-2 text-base text-white rounded-md shadow-md bg-secondary lg:mb-0"
          >
            Decline Final Payment
          </button>
          <button
            onClick={() => {
              handleUpdateStatus(8);
            }}
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Verify Final Payment
          </button>
        </>
      );
    }
  }

  return null;
}
