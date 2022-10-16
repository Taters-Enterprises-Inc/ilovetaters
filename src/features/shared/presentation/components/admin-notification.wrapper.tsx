import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getAdminShopOrders } from "features/admin/presentation/slices/get-admin-shop-orders.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { getAdminCateringBookings } from "features/admin/presentation/slices/get-admin-catering-bookings.slice";
import { getAdminPopclubRedeems } from "features/admin/presentation/slices/get-admin-popclub-redeems.slice";
import { pusher } from "features/shared/constants";

interface TransactionParam {
  store_id: number;
  message: string;
}

export function AdminNotificationWrapper() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    pusher.unsubscribe("admin-snackshop");
    const snackshopChannel = pusher.subscribe("admin-snackshop");

    snackshopChannel.bind("order-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.is_admin ||
        getAdminSessionState.data?.is_csr ||
        getAdminSessionState.data?.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminShopOrders(""));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pusher.unsubscribe("admin-catering");
    const cateringChannel = pusher.subscribe("admin-catering");

    cateringChannel.bind("booking-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.is_admin ||
        getAdminSessionState.data?.is_csr ||
        getAdminSessionState.data?.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminCateringBookings(""));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pusher.unsubscribe("admin-popclub");
    const popclubChannel = pusher.subscribe("admin-popclub");

    popclubChannel.bind(
      "popclub-store-visit-transaction",
      (data: TransactionParam) => {
        if (
          getAdminSessionState.data?.is_admin ||
          getAdminSessionState.data?.is_csr ||
          getAdminSessionState.data?.user_details.stores.some(
            (store) => store.store_id === data.store_id
          )
        ) {
          toast("🦄 " + data.message);
          dispatch(getAdminPopclubRedeems(""));
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
