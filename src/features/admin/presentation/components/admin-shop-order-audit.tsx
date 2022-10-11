import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  GetAdminShopOrderState,
  selectGetAdminShopOrder,
} from "../slices/get-admin-shop-order.slice";
import {
  getShopTransactionLogs,
  selectGetShopTransactionLogs,
} from "../slices/get-shop-transaction-logs.slice";

export function AdminShopOrderAudit() {
  const dispatch = useAppDispatch();

  const getAdminShopOrderState = useAppSelector(selectGetAdminShopOrder);
  const getShopTransactionLogsState = useAppSelector(
    selectGetShopTransactionLogs
  );

  useEffect(() => {
    if (
      getAdminShopOrderState.status === GetAdminShopOrderState.success &&
      getAdminShopOrderState.data
    ) {
      dispatch(getShopTransactionLogs(getAdminShopOrderState.data.id));
    }
  }, []);

  return (
    <div>
      <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:table customer-information-table">
        <thead className="text-xs text-white uppercase bg-secondary ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Remarks
            </th>
          </tr>
        </thead>

        {getShopTransactionLogsState.data &&
        getShopTransactionLogsState.data.length > 0 ? (
          <tbody>
            {getShopTransactionLogsState.data.map((log) => (
              <tr>
                <td>{log.dateadded}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.details}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>

      {getShopTransactionLogsState.data &&
      getShopTransactionLogsState.data.length > 0 ? null : (
        <div className="py-4 text-center">Empty logs</div>
      )}
    </div>
  );
}
