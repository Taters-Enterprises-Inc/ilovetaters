import { getAdminNotifications } from "features/admin/presentation/slices/get-admin-notifications.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { getAdminShopOrders } from "features/admin/presentation/slices/get-admin-shop-orders.slice";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { pusher } from "features/shared/constants";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getStockOrders } from "../slices/get-stock-orders.slice";

interface TransactionParam {
  store_id: number;
  message: string;
}

export function StockOrderingBadgeWrapper() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const query = useQuery();

  useEffect(() => {
    pusher.unsubscribe("admin-stock-ordering");
    const stockOrderingChannel = pusher.subscribe("admin-stock-ordering");

    stockOrderingChannel.bind(
      "stockorder-process",
      (data: TransactionParam) => {
        if (
          getAdminSessionState.data?.admin.is_admin ||
          getAdminSessionState.data?.admin.user_details.sos_groups.length !==
            0 ||
          getAdminSessionState.data?.admin.user_details.stores.some(
            (store) => store.store_id === data.store_id
          )
        ) {
          dispatch(getStockOrders(""));
        }
      }
    );
  }, [getAdminSessionState, dispatch, query]);

  return (
    <>
      <Outlet />
    </>
  );
}
