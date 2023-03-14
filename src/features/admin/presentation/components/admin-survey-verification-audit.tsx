import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { ADMIN_SNACKSHOP_TRANSACTION_LOGS_ACTION_STATUS } from "features/shared/constants";
import { useEffect } from "react";
import {
  getCustomerSurveyResponseLogs,
  selectGetCustomerSurveyResponseLogs,
} from "../slices/get-customer-survey-response-logs.slice";
import Moment from "react-moment";
import {
  selectGetAdminSurveyVerification,
  GetAdminSurveyVerificationState,
} from "../slices/get-admin-survey-verification.slice";

export function AdminSurveyVerificationAudit() {
  const dispatch = useAppDispatch();

  const getAdminSurveyVerificationState = useAppSelector(
    selectGetAdminSurveyVerification
  );
  const getCustomerSurveyResponseLogsState = useAppSelector(
    selectGetCustomerSurveyResponseLogs
  );

  useEffect(() => {
    if (
      getAdminSurveyVerificationState.status ===
        GetAdminSurveyVerificationState.success &&
      getAdminSurveyVerificationState.data
    ) {
      dispatch(
        getCustomerSurveyResponseLogs(getAdminSurveyVerificationState.data.id)
      );
    }
  }, [dispatch]);

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

        {getCustomerSurveyResponseLogsState.data &&
        getCustomerSurveyResponseLogsState.data.length > 0 ? (
          <tbody>
            {getCustomerSurveyResponseLogsState.data.map((log) => (
              <tr>
                <td className="px-6 py-3">
                  <Moment format="LLL">{log.dateadded}</Moment>
                </td>
                <td className="px-6 py-3">{log.user}</td>
                <td className="px-6 py-3">
                  <span
                    className="px-2 py-1 text-white rounded-full"
                    style={{
                      backgroundColor: log.action_color,
                    }}
                  >
                    {log.action_name}
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
        {getCustomerSurveyResponseLogsState.data &&
        getCustomerSurveyResponseLogsState.data.length > 0 ? (
          <>
            {getCustomerSurveyResponseLogsState.data.map((log) => (
              <div className="py-4 border-b">
                <div className="text-lg font-semibold ">{log.user}</div>
                <div className="flex items-center space-x-2">
                  <span>{log.details}</span>
                  <span
                    className="px-2 py-1 text-xs text-white rounded-full"
                    style={{
                      backgroundColor: log.action_color,
                    }}
                  >
                    {log.action_name}
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

      {getCustomerSurveyResponseLogsState.data &&
      getCustomerSurveyResponseLogsState.data.length > 0 ? null : (
        <div className="py-4 text-center">Empty logs</div>
      )}
    </div>
  );
}
