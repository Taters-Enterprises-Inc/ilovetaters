import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { pusher } from "features/shared/constants";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getSalesManagerPendingTask } from "../slices/get-sales-manager-pending.slice";
import { getSalesTCPendingTask } from "../slices/get-sales-tc-pending-task.slice";
import { getSalesCashierSavedForm } from "../slices/get-sales-cashier-saved-form.slice";
import { getSalesCompleted } from "../slices/get-sales-completed.slice";

interface TransactionParam {
  store_id: number;
  message: string;
}

export function SalesRealtimeWrapper() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    pusher.unsubscribe("admin-sales");
    const salesChannel = pusher.subscribe("admin-sales");

    salesChannel.bind("sales-fetch-manager", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.user_details.sales_groups.length !==
          0 ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        dispatch(getSalesManagerPendingTask());
      }
    });

    salesChannel.bind("sales-fetch-cashier", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.user_details.sales_groups.length !==
          0 ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        dispatch(getSalesCashierSavedForm());
      }
    });

    salesChannel.bind("sales-fetch-tc", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.user_details.sales_groups.length !==
          0 ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        dispatch(getSalesTCPendingTask());
      }
    });

    salesChannel.bind("sales-fetch-dashboard", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.admin.is_admin ||
        getAdminSessionState.data?.admin.user_details.sales_groups.length !==
          0 ||
        getAdminSessionState.data?.admin.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        dispatch(getSalesCompleted());
      }
    });
  }, [getAdminSessionState, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}
