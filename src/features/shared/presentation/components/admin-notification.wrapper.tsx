import { Outlet } from "react-router-dom";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "features/config/hooks";
import { getAdminShopOrders } from "features/admin/presentation/slices/get-admin-shop-orders.slice";

const pusher = new Pusher("8a62b17c8a9baa690edb", {
  cluster: "ap1",
});

interface SnackshopSnackshopNotificationParam {
  store_id: string;
  message: string;
}

export function AdminNotificationWrapper() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const snackshopChannel = pusher.subscribe("snackshop");

    snackshopChannel.bind(
      "order-transaction",
      (data: SnackshopSnackshopNotificationParam) => {
        toast(data.message);
        dispatch(getAdminShopOrders(""));
      }
    );
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
