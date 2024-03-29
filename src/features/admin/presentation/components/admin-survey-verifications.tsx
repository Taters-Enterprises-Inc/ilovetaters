import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import { ADMIN_SURVEY_VERIFICATION_STATUS } from "features/shared/constants";
import { createQueryParams } from "features/config/helpers";
import {
  getAdminSurveyVerification,
  resetGetAdminSurveyVerificationStatus,
} from "../slices/get-admin-survey-verification.slice";
import { DataList } from "features/shared/presentation/components";
import Moment from "react-moment";
import { FaEye } from "react-icons/fa";
import { AdminSurveyVerificationModal } from "../modals";
import {
  getAdminSurveyVerifications,
  selectGetAdminSurveyVerifications,
} from "../slices/get-admin-survey-verifications.slice";
import { selectAdminSurveyVerificationChangeStatus } from "../slices/admin-survey-verification-change-status.slice";
import { AdminChipsButton } from "./chips-button";
import { selectGetAdminNotifications } from "../slices/get-admin-notifications.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import {
  selectUpdateAdminNotificationDateSeen,
  updateAdminNotificationDateSeen,
} from "../slices/update-admin-notification-dateseen.slice";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "order_date", label: "Order Date" },
  { id: "dateadded", label: "Survey Date" },
  {
    id: "invoice_number",
    label: "Invoice Number",
  },
  { id: "order_type", label: "Order Type" },
  { id: "store", label: "Store" },
  { id: "action", label: "Action" },
];

export function AdminSurveyVerifications() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const id = query.get("id");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [
    openAdminSurveyVerificationModal,
    setOpenAdminSurveyVerificationModal,
  ] = useState(false);

  const getAdminSurveyVerificationsStates = useAppSelector(
    selectGetAdminSurveyVerifications
  );

  const adminSurveyVerificationChangeStatusState = useAppSelector(
    selectAdminSurveyVerificationChangeStatus
  );

  const getAdminNotificationsState = useAppSelector(
    selectGetAdminNotifications
  );
  const updateAdminNotificationDateSeenState = useAppSelector(
    selectUpdateAdminNotificationDateSeen
  );

  useEffect(() => {
    if (id) {
      dispatch(getAdminSurveyVerification(id)).then(() => {
        setOpenAdminSurveyVerificationModal(true);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminSurveyVerifications(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    adminSurveyVerificationChangeStatusState,
  ]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end">
        <span className="px-4 text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Survey Verification
        </span>
        <AdminChipsButton
          createQueryParams={createQueryParams}
          data={ADMIN_SURVEY_VERIFICATION_STATUS}
          dispatchAction={() => {
            dispatch(resetGetAdminSurveyVerificationStatus());
          }}
          status={status}
          params={(value) => {
            const params = {
              page_no: pageNo,
              per_page: perPage,
              status: value === -1 ? null : value,
              search: search,
            };
            return params;
          }}
        />
      </div>

      {getAdminSurveyVerificationsStates.data?.surveys ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No user surveys yet."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
                  order_by: orderBy,
                  order: order,
                  search: val === "" ? null : val,
                };

                const queryParams = createQueryParams(params);

                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    status: status,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSurveyVerificationStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  const params = {
                    page_no: newPage,
                    per_page: perPage,
                    status: status,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSurveyVerificationStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminSurveyVerificationsStates.data.pagination.total_rows
              }
              perPage={
                getAdminSurveyVerificationsStates.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />

              {getAdminSurveyVerificationsStates.data.surveys.map((row, i) => {
                const notification: NotificationModel | undefined =
                  getAdminNotificationsState.data?.survey_verification.unseen_notifications.find(
                    (notification) =>
                      notification.customer_survey_response_id === row.id
                  );

                return (
                  <div
                    onClick={() => {
                      if (notification) {
                        dispatch(
                          updateAdminNotificationDateSeen(notification.id)
                        );
                      }

                      const params = {
                        page_no: pageNo,
                        per_page: perPage,
                        status: status,
                        id: row.id,
                        search: search,
                      };

                      const queryParams = createQueryParams(params);

                      navigate({
                        pathname: "",
                        search: queryParams,
                      });
                    }}
                    className={`flex flex-col px-4 py-2 border-b ${
                      notification ? "bg-gray-200" : ""
                    }`}
                    key={i}
                  >
                    <span className="flex flex-wrap items-center space-x-1 text-xl">
                      <span>Walk-in</span>

                      <span
                        className="px-2 py-1 text-xs rounded-full "
                        style={{
                          color: "white",
                          backgroundColor:
                            ADMIN_SURVEY_VERIFICATION_STATUS[row.status].color,
                        }}
                      >
                        {ADMIN_SURVEY_VERIFICATION_STATUS[row.status].name}
                      </span>
                    </span>

                    <span className="text-xs text-gray-600">
                      <strong> Invoice Number:</strong> {row.invoice_no}
                    </span>
                    <span className="text-xs text-gray-600">
                      <strong>Date and Time: </strong>
                      <Moment format="lll">{row.dateadded}</Moment>
                    </span>
                  </div>
                );
              })}
            </DataList>
          </div>
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No user surveys yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
                  order_by: orderBy,
                  order: order,
                  search: val === "" ? null : val,
                };

                const queryParams = createQueryParams(params);

                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              onRequestSort={(column_selected) => {
                if (column_selected !== "action") {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    status: status,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSurveyVerificationStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              columns={columns}
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    status: status,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSurveyVerificationStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  const params = {
                    page_no: newPage,
                    per_page: perPage,
                    status: status,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSurveyVerificationStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminSurveyVerificationsStates.data.pagination.total_rows
              }
              perPage={
                getAdminSurveyVerificationsStates.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminSurveyVerificationsStates.data.surveys !== undefined ? (
                <>
                  {getAdminSurveyVerificationsStates.data.surveys.map(
                    (row, i) => {
                      const notification: NotificationModel | undefined =
                        getAdminNotificationsState.data?.survey_verification.unseen_notifications.find(
                          (notification) =>
                            notification.customer_survey_response_id === row.id
                        );

                      return (
                        <DataTableRow
                          key={i}
                          className={`${notification ? "bg-gray-200" : ""}`}
                        >
                          <DataTableCell>
                            <span
                              className="px-2 py-1 text-xs rounded-full "
                              style={{
                                color: "white",
                                backgroundColor:
                                  ADMIN_SURVEY_VERIFICATION_STATUS[row.status]
                                    .color,
                              }}
                            >
                              {
                                ADMIN_SURVEY_VERIFICATION_STATUS[row.status]
                                  .name
                              }
                            </span>
                          </DataTableCell>
                          <DataTableCell>
                            <Moment format="ll">{row.order_date}</Moment>
                          </DataTableCell>
                          <DataTableCell>
                            <Moment format="lll">{row.dateadded}</Moment>
                          </DataTableCell>
                          <DataTableCell>{row.invoice_no}</DataTableCell>
                          <DataTableCell>{row.order_type}</DataTableCell>
                          <DataTableCell>{row.store_name}</DataTableCell>

                          <DataTableCell align="left">
                            <button
                              onClick={() => {
                                if (notification) {
                                  dispatch(
                                    updateAdminNotificationDateSeen(
                                      notification.id
                                    )
                                  );
                                }

                                const params = {
                                  page_no: pageNo,
                                  per_page: perPage,
                                  status: status,
                                  id: row.id,
                                  order_by: orderBy,
                                  order: order,
                                  search: search,
                                };

                                const queryParams = createQueryParams(params);

                                navigate({
                                  pathname: "",
                                  search: queryParams,
                                });
                              }}
                            >
                              <FaEye className="text-lg" />
                            </button>
                          </DataTableCell>
                        </DataTableRow>
                      );
                    }
                  )}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}

      <AdminSurveyVerificationModal
        open={openAdminSurveyVerificationModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            status: status,
            redeem_code: null,
            order_by: orderBy,
            order: order,
            search: search,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
          setOpenAdminSurveyVerificationModal(false);
        }}
      />
    </>
  );
}
