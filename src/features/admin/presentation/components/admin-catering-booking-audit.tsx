import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { ADMIN_SNACKSHOP_TRANSACTION_LOGS_ACTION_STATUS } from "features/shared/constants";
import { useEffect } from "react";
import {
  GetAdminCateringBookingState,
  selectGetAdminCateringBooking,
} from "../slices/get-admin-catering-booking.slice";
import {
  getCateringTransactionLogs,
  selectGetCateringTransactionLogs,
} from "../slices/get-catering-transaction-logs.slice";
import Moment from "react-moment";

export function AdminCateringBookingAudit() {
  const dispatch = useAppDispatch();

  const getAdminCateringBookingState = useAppSelector(
    selectGetAdminCateringBooking
  );
  const getCateringTransactionLogsState = useAppSelector(
    selectGetCateringTransactionLogs
  );

  useEffect(() => {
    if (
      getAdminCateringBookingState.status ===
        GetAdminCateringBookingState.success &&
      getAdminCateringBookingState.data
    ) {
      dispatch(
        getCateringTransactionLogs(getAdminCateringBookingState.data.id)
      );
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

        {getCateringTransactionLogsState.data &&
        getCateringTransactionLogsState.data.length > 0 ? (
          <tbody>
            {getCateringTransactionLogsState.data.map((log) => (
              <tr>
                <td className="px-6 py-3">
                  <Moment format="LLL">{log.dateadded}</Moment>
                </td>
                <td className="px-6 py-3">{log.user}</td>
                <td className="px-6 py-3">
                  <span
                    className="px-2 py-1 text-white rounded-full"
                    style={{
                      backgroundColor:
                        ADMIN_SNACKSHOP_TRANSACTION_LOGS_ACTION_STATUS[
                          log.action
                        ].color,
                    }}
                  >
                    {
                      ADMIN_SNACKSHOP_TRANSACTION_LOGS_ACTION_STATUS[log.action]
                        .name
                    }
                  </span>
                </td>
                <td className="px-6 py-3">{log.details}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>

      <div className="lg:hidden">
        <hr className="mt-4" />
        {getCateringTransactionLogsState.data &&
        getCateringTransactionLogsState.data.length > 0 ? (
          <>
            {getCateringTransactionLogsState.data.map((log) => (
              <div className="py-4 border-b">
                <div className="text-lg font-semibold ">{log.user}</div>
                <div className="flex items-center space-x-2">
                  <span>{log.details}</span>
                  <span
                    className="px-2 py-1 text-xs text-white rounded-full"
                    style={{
                      backgroundColor:
                        ADMIN_SNACKSHOP_TRANSACTION_LOGS_ACTION_STATUS[
                          log.action
                        ].color,
                    }}
                  >
                    {
                      ADMIN_SNACKSHOP_TRANSACTION_LOGS_ACTION_STATUS[log.action]
                        .name
                    }
                  </span>
                </div>
                <Moment format="LLL" className="text-xs">
                  {log.dateadded}
                </Moment>
              </div>
            ))}
          </>
        ) : null}
      </div>

      {getCateringTransactionLogsState.data &&
      getCateringTransactionLogsState.data.length > 0 ? null : (
        <div className="py-4 text-center">Empty logs</div>
      )}
    </div>
  );
}
