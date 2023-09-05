import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { getAdminShopOrders } from "features/admin/presentation/slices/get-admin-shop-orders.slice";
import {
  GetAdminSessionState,
  getAdminSession,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";
import { getAdminCateringBookings } from "features/admin/presentation/slices/get-admin-catering-bookings.slice";
import { getAdminPopclubRedeems } from "features/admin/presentation/slices/get-admin-popclub-redeems.slice";
import { pusher } from "features/shared/constants";
import { getAdminNotifications } from "features/admin/presentation/slices/get-admin-notifications.slice";
import { getAdminShopOrder } from "features/admin/presentation/slices/get-admin-shop-order.slice";
import { getAdminCateringBooking } from "features/admin/presentation/slices/get-admin-catering-booking.slice";
import { getAdminSurveyVerifications } from "../slices/get-admin-survey-verifications.slice";
import { getAdminUserDiscounts } from "../slices/get-admin-user-discounts.slice";
import { getAdminInfluencerApplications } from "../slices/get-admin-influencer-applications.slice";
import { getAdminInfluencerApplication } from "../slices/get-admin-influencer-application.slice";
import { getAdminInfluencerCashouts } from "../slices/get-admin-influencer-cashouts.slice";

interface TransactionParam {
  store_id: number;
  message: string;
}

export function AdminNotificationWrapper() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const query = useQuery();

  useEffect(() => {
    pusher.unsubscribe("admin-snackshop");
    const snackshopChannel = pusher.subscribe("admin-snackshop");

    snackshopChannel.bind("order-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.is_csr_admin ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminShopOrders(""));
        dispatch(getAdminNotifications());
      }
    });

    snackshopChannel.bind("payment-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.is_csr_admin ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminShopOrders(""));
        dispatch(getAdminNotifications());

        const trackingNo = query.get("tracking_no");

        if (trackingNo) {
          dispatch(getAdminShopOrder(trackingNo));
        }
      }
    });
  }, [getAdminSessionState, dispatch, query]);

  useEffect(() => {
    pusher.unsubscribe("admin-catering");
    const cateringChannel = pusher.subscribe("admin-catering");

    cateringChannel.bind("booking-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.is_csr_admin ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminCateringBookings(""));
        dispatch(getAdminNotifications());
      }
    });

    cateringChannel.bind("contract-booking", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.is_csr_admin ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);

        const trackingNo = query.get("tracking_no");

        if (trackingNo) {
          dispatch(getAdminCateringBooking(trackingNo));
        }

        dispatch(getAdminCateringBookings(""));
        dispatch(getAdminNotifications());
      }
    });

    cateringChannel.bind("payment-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.is_csr_admin ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);

        const trackingNo = query.get("tracking_no");

        if (trackingNo) {
          dispatch(getAdminCateringBooking(trackingNo));
        }

        dispatch(getAdminCateringBookings(""));
        dispatch(getAdminNotifications());
      }
    });
  }, [getAdminSessionState, dispatch, query]);

  useEffect(() => {
    pusher.unsubscribe("admin-popclub");
    const popclubChannel = pusher.subscribe("admin-popclub");

    popclubChannel.bind(
      "popclub-store-visit-transaction",
      (data: TransactionParam) => {
        if (
          getAdminSessionState.data?.admin.is_admin ||
          getAdminSessionState.data?.admin.is_csr_admin ||
          getAdminSessionState.data?.admin.user_details.stores.some(
            (store) => store.store_id === data.store_id
          )
        ) {
          toast("🦄 " + data.message);
          dispatch(getAdminPopclubRedeems(""));
          dispatch(getAdminNotifications());
        }
      }
    );
  }, [getAdminSessionState, dispatch]);

  useEffect(() => {
    pusher.unsubscribe("admin-survey-verification");
    const surveyVerificationChannel = pusher.subscribe(
      "admin-survey-verification"
    );

    surveyVerificationChannel.bind("new-survey", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.is_csr_admin ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminSurveyVerifications(""));
        dispatch(getAdminNotifications());
      }
    });
  }, [getAdminSessionState, dispatch, query]);

  useEffect(() => {
    pusher.unsubscribe("admin-discount-user");
    const discountUserChannel = pusher.subscribe("admin-discount-user");

    discountUserChannel.bind(
      "discount-application",
      (data: TransactionParam) => {
        if (
          getAdminSessionState.data?.admin.is_admin ||
          getAdminSessionState.data?.admin.is_csr_admin
        ) {
          toast("🦄 " + data.message);
          dispatch(getAdminUserDiscounts(""));
          dispatch(getAdminNotifications());
        }
      }
    );
  }, [getAdminSessionState, dispatch, query]);

  useEffect(() => {
    pusher.unsubscribe("admin-influencer");
    const discountUserChannel = pusher.subscribe("admin-influencer");

    discountUserChannel.bind(
      "influencer-application",
      (data: TransactionParam) => {
        if (
          getAdminSessionState.data?.admin.is_admin ||
          getAdminSessionState.data?.admin.is_csr_admin
        ) {
          toast("🦄 " + data.message);
          dispatch(getAdminInfluencerApplications(""));
          dispatch(getAdminNotifications());
        }
      }
    );

    discountUserChannel.bind("influencer-cashout", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.is_csr_admin
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminInfluencerCashouts(""));
        dispatch(getAdminNotifications());
      }
    });

    discountUserChannel.bind(
      "influencer-application-with-id",
      (data: TransactionParam) => {
        if (
          getAdminSessionState.data?.admin.is_admin ||
          getAdminSessionState.data?.admin.is_csr_admin
        ) {
          toast("🦄 " + data.message);

          const influencerId = query.get("id");

          if (influencerId) {
            dispatch(getAdminInfluencerApplication(influencerId));
          }

          dispatch(getAdminInfluencerApplications(""));
          dispatch(getAdminNotifications());
        }
      }
    );
  }, [getAdminSessionState, dispatch, query]);

  useEffect(() => {
    pusher.unsubscribe("admin-session");
    const adminSessionChannel = pusher.subscribe("admin-session");

    adminSessionChannel.bind(
      "admin-login-session",
      (data: {
        stored_session_id: string;
        user_id: string;
        logout: boolean;
      }) => {
        if (
          GetAdminSessionState.success === getAdminSessionState.status &&
          data.stored_session_id &&
          data.user_id &&
          data.user_id === getAdminSessionState.data?.admin.user_id
        ) {
          if (
            getAdminSessionState.data?.admin.session_id !==
            data.stored_session_id
          ) {
            navigate("/admin");
          }
        }
      }
    );

    adminSessionChannel.bind("no-admin-session", (data: boolean) => {
      // if (
      //   data &&
      //   GetAdminSessionState.success === getAdminSessionState.status &&
      //   !getAdminSessionState.data
      // ) {
      //   navigate("/admin");
      // }
      if (data) {
        console.log("tigger: no session data");
      }
    });

    adminSessionChannel.bind("no-session-redirect-to-admin", (data: string) => {
      // if (getAdminSessionState.data?.admin.user_id === data) {
      //   window.location.reload();
      // }

      console.log(data);
    });
  }, [getAdminSessionState.data?.admin.session_id]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={18000000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Outlet />
    </>
  );
}
